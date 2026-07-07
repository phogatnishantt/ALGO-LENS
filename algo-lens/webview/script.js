(function () {
  const vscode = acquireVsCodeApi();

  /* ------------------------------------------------------------
     Hint unlock schedule (seconds of active session time).
     The extension does not currently send per-hint unlock times,
     so the webview paces reveals against elapsed session time and
     asks the extension to surface a "still locked" notice when a
     locked hint is tapped early.
  ------------------------------------------------------------ */
  const HINT_UNLOCK_THRESHOLDS = [120, 360, 720]; // 2 min, 6 min, 12 min

  const state = {
    problem: null,
    hints: [],
    openHints: new Set(),
    sampleTests: [],
    edgeCases: [],
    testStatus: {},   // id -> { status, actual, error }
    elapsedSeconds: 0,
    sessionState: "READY",
  };

  /* ---------------- DOM refs ---------------- */
  const el = {
    problemCard: document.getElementById("problem-card"),
    problemPlatform: document.getElementById("problem-platform"),
    problemId: document.getElementById("problem-id"),
    problemTitle: document.getElementById("problem-title"),
    problemRating: document.getElementById("problem-rating"),
    difficultyBadge: document.getElementById("difficulty-badge"),
    tagsRow: document.getElementById("tags-row"),
    gaugeFill: document.getElementById("lens-gauge-fill"),

    statusDot: document.getElementById("status-dot"),
    statusText: document.getElementById("status-text"),
    timer: document.getElementById("timer"),

    btnStart: document.getElementById("btn-start"),
    btnPause: document.getElementById("btn-pause"),
    btnResume: document.getElementById("btn-resume"),
    btnComplete: document.getElementById("btn-complete"),

    statSuccess: document.getElementById("stat-success"),
    statWrong: document.getElementById("stat-wrong"),

    hintsList: document.getElementById("hints-list"),
    hintsEmpty: document.getElementById("hints-empty"),
    hintsCount: document.getElementById("hints-count"),

    tabSample: document.getElementById("tab-sample"),
    tabEdge: document.getElementById("tab-edge"),
    panelSample: document.getElementById("panel-sample"),
    panelEdge: document.getElementById("panel-edge"),
    sampleList: document.getElementById("sample-list"),
    edgeList: document.getElementById("edge-list"),
    sampleEmpty: document.getElementById("sample-empty"),
    edgeEmpty: document.getElementById("edge-empty"),
    sampleCount: document.getElementById("sample-count"),
    edgeCount: document.getElementById("edge-count"),
  };

  const GAUGE_CIRCUMFERENCE = 2 * Math.PI * 36; // r=36

  /* ================= helpers ================= */

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function stringifyIO(v) {
    if (v === undefined || v === null) return "—";
    if (typeof v === "string") return v;
    try { return JSON.stringify(v, null, 2); } catch (e) { return String(v); }
  }

  function parseTimeToSeconds(hhmmss) {
    const parts = String(hhmmss).split(":").map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) return 0;
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }

  /* ================= renderers ================= */

  function renderProblem(p) {
    state.problem = p;
    el.problemCard.dataset.empty = "false";

    el.problemPlatform.textContent = p.platform || "—";
    el.problemId.textContent = `${p.contestId ?? ""}${p.problemIndex ?? ""}`.trim() || "—";
    el.problemTitle.textContent = p.problemName || "Untitled problem";
    el.problemRating.textContent = p.rating != null ? p.rating : "—";
    el.difficultyBadge.textContent = p.difficulty || "—";

    const pct = Math.max(0, Math.min(100, Number(p.difficultyWidth) || 0));
    const offset = GAUGE_CIRCUMFERENCE * (1 - pct / 100);
    el.gaugeFill.style.strokeDasharray = `${GAUGE_CIRCUMFERENCE} ${GAUGE_CIRCUMFERENCE}`;
    el.gaugeFill.style.strokeDashoffset = String(offset);

    el.tagsRow.innerHTML = "";
    (p.tags || []).forEach((t) => {
      const chip = document.createElement("span");
      chip.className = "tag-chip";
      chip.textContent = t;
      el.tagsRow.appendChild(chip);
    });

    el.problemCard.classList.remove("is-scanning");
    // restart the scan animation
    void el.problemCard.offsetWidth;
    el.problemCard.classList.add("is-scanning");
  }

  function renderStatus(value, sessionState) {
    state.sessionState = sessionState;
    el.statusDot.dataset.state = sessionState;
    el.statusText.textContent = value;

    const showStart = sessionState === "READY";
    const showPause = sessionState === "ACTIVE";
    const showResume = sessionState === "PAUSED";
    const showComplete = sessionState === "ACTIVE" || sessionState === "PAUSED";

    el.btnStart.hidden = !showStart;
    el.btnPause.hidden = !showPause;
    el.btnResume.hidden = !showResume;
    el.btnComplete.hidden = !showComplete;

    renderHints(state.hints);
  }

  function renderTimer(value) {
    el.timer.textContent = value;
    state.elapsedSeconds = parseTimeToSeconds(value);
    if (state.sessionState === "ACTIVE") {
      renderHints(state.hints);
    }
  }

  function hintUnlockInfo(index) {
    const threshold = HINT_UNLOCK_THRESHOLDS[index] ?? HINT_UNLOCK_THRESHOLDS[HINT_UNLOCK_THRESHOLDS.length - 1];
    const unlocked = state.sessionState !== "READY" && state.elapsedSeconds >= threshold;
    const remaining = Math.max(0, threshold - state.elapsedSeconds);
    return { unlocked, remaining };
  }

  function renderHints(hints) {
    state.hints = hints || [];
    const isLoading = state.hints.some((h) => /^Generating Hint/i.test(h));
    el.hintsCount.textContent = `${state.hints.length} hint${state.hints.length === 1 ? "" : "s"}`;
    el.hintsEmpty.style.display = state.hints.length ? "none" : "block";

    el.hintsList.querySelectorAll(".hint-item").forEach((n) => n.remove());

    state.hints.forEach((text, i) => {
      const generating = /^Generating Hint/i.test(text);
      const { unlocked, remaining } = hintUnlockInfo(i);
      const isOpen = state.openHints.has(i);

      const item = document.createElement("div");
      item.className = "hint-item" + (isOpen && unlocked && !generating ? " is-open" : "");
      item.dataset.unlocked = unlocked && !generating ? "true" : "false";

      let badgeHtml;
      if (generating) {
        badgeHtml = `<span class="hint-badge hint-badge--loading">Generating</span>`;
      } else if (unlocked) {
        badgeHtml = `<span class="hint-badge hint-badge--ready">Unlocked</span>`;
      } else {
        const m = Math.floor(remaining / 60);
        const s = remaining % 60;
        badgeHtml = `<span class="hint-badge hint-badge--locked">${m}:${String(s).padStart(2, "0")}</span>`;
      }

      item.innerHTML = `
        <button class="hint-trigger" type="button" data-index="${i}">
          <span class="hint-left">
            <span class="hint-index">0${i + 1}</span>
            <span class="hint-name">Hint ${i + 1}</span>
          </span>
          <span style="display:flex; align-items:center; gap:8px;">
            ${badgeHtml}
            <svg class="hint-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 7.5L10 12.5L15 7.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </button>
        <div class="hint-body">${escapeHtml(unlocked && !generating ? text : "This hint is still locked.")}</div>
      `;

      const trigger = item.querySelector(".hint-trigger");
      trigger.addEventListener("click", () => {
        if (generating) return;
        if (!unlocked) {
          vscode.postMessage({ command: "hintLocked", remaining });
          item.animate(
            [{ transform: "translateX(0)" }, { transform: "translateX(-4px)" }, { transform: "translateX(4px)" }, { transform: "translateX(0)" }],
            { duration: 220 }
          );
          return;
        }
        if (state.openHints.has(i)) {
          state.openHints.delete(i);
        } else {
          state.openHints.add(i);
        }
        renderHints(state.hints);
      });

      el.hintsList.appendChild(item);
    });
  }

  function statusMeta(status) {
    switch (status) {
      case "running": return { pillClass: "test-pill--running", label: "Running" };
      case "passed": return { pillClass: "test-pill--passed", label: "Passed" };
      case "wrong": return { pillClass: "test-pill--wrong", label: "Wrong answer" };
      case "error": return { pillClass: "test-pill--error", label: "Runtime error" };
      default: return { pillClass: "", label: "Not run" };
    }
  }

  function testItemHtml(test, idx, group) {
    const id = test.id ?? `${group}-${idx}`;
    const record = state.testStatus[id];
    const status = record ? record.status : "idle";
    const meta = statusMeta(status);
    const spinner = status === "running" ? `<span class="spin-dot"></span>` : "";

    const inputVal = stringifyIO(test.input);
    const outputVal = stringifyIO(test.output ?? test.expectedOutput);

    let actualBlock = "";
    if (record && (status === "wrong" || status === "error") ) {
      const actualVal = record.error ? record.error : stringifyIO(record.actual);
      const label = record.error ? "Error" : "Actual output";
      actualBlock = `
        <div class="test-actual">
          <span class="test-io-label">${label}</span>
          <div class="test-io-value">${escapeHtml(actualVal)}</div>
        </div>`;
    } else if (record && status === "passed" && record.actual !== undefined) {
      actualBlock = `
        <div class="test-actual">
          <span class="test-io-label">Actual output</span>
          <div class="test-io-value">${escapeHtml(stringifyIO(record.actual))}</div>
        </div>`;
    }

    return `
      <div class="test-item" data-status="${status === "idle" ? "" : status}" data-id="${escapeHtml(String(id))}" data-group="${group}">
        <div class="test-item-top">
          <span class="test-name">${escapeHtml(test.name || `Case ${idx + 1}`)}</span>
          <span class="test-pill ${meta.pillClass}">${spinner}${meta.label}</span>
        </div>
        <div class="test-io">
          <div class="test-io-block">
            <span class="test-io-label">Input</span>
            <div class="test-io-value">${escapeHtml(inputVal)}</div>
          </div>
          <div class="test-io-block">
            <span class="test-io-label">Expected</span>
            <div class="test-io-value">${escapeHtml(outputVal)}</div>
          </div>
        </div>
        ${actualBlock}
        <button class="btn btn--outline test-run-btn" type="button">Run</button>
      </div>
    `;
  }

  function renderTestGroup(listEl, emptyEl, countEl, tests, group) {
    countEl.textContent = String(tests.length);
    emptyEl.style.display = tests.length ? "none" : "block";
    listEl.innerHTML = tests.map((t, i) => testItemHtml(t, i, group)).join("");

    listEl.querySelectorAll(".test-item").forEach((node, i) => {
      const btn = node.querySelector(".test-run-btn");
      btn.addEventListener("click", () => {
        const test = tests[i];
        vscode.postMessage({ command: "runTest", test });
      });
    });
  }

  function renderTests(sampleTests, edgeCases) {
    state.sampleTests = sampleTests || [];
    state.edgeCases = edgeCases || [];
    renderTestGroup(el.sampleList, el.sampleEmpty, el.sampleCount, state.sampleTests, "sample");
    renderTestGroup(el.edgeList, el.edgeEmpty, el.edgeCount, state.edgeCases, "edge");
  }

  function findTestGroupAndIndex(id) {
    let idx = state.sampleTests.findIndex((t, i) => (t.id ?? `sample-${i}`) === id);
    if (idx !== -1) return { group: "sample", idx };
    idx = state.edgeCases.findIndex((t, i) => (t.id ?? `edge-${i}`) === id);
    if (idx !== -1) return { group: "edge", idx };
    return null;
  }

  function setTestStatus(id, record) {
    state.testStatus[id] = record;
    const loc = findTestGroupAndIndex(id);
    if (!loc) return;
    if (loc.group === "sample") {
      renderTestGroup(el.sampleList, el.sampleEmpty, el.sampleCount, state.sampleTests, "sample");
    } else {
      renderTestGroup(el.edgeList, el.edgeEmpty, el.edgeCount, state.edgeCases, "edge");
    }
  }

  function renderSession(msg) {
    el.statSuccess.textContent = String(msg.successfulRuns ?? 0);
    el.statWrong.textContent = String(msg.wrongSubmissions ?? 0);
  }

  /* ================= message bus ================= */

  window.addEventListener("message", (event) => {
    const msg = event.data;
    if (!msg || !msg.type) return;

    switch (msg.type) {
      case "problem":
        renderProblem(msg);
        break;
      case "status":
        renderStatus(msg.value, msg.state);
        break;
      case "timer":
        renderTimer(msg.value);
        break;
      case "hints":
        renderHints(msg.hints);
        break;
      case "tests":
        renderTests(msg.sampleTests, msg.edgeCases);
        break;
      case "testLoading":
        setTestStatus(msg.id, { status: "running" });
        break;
      case "testResult": {
        const r = msg.result || {};
        let status = "wrong";
        if (r.passed || r.success) status = "passed";
        else if (r.compileError || r.runtimeError || r.error) status = "error";
        setTestStatus(r.id, { status, actual: r.actualOutput ?? r.output, error: r.error });
        break;
      }
      case "session":
        renderSession(msg);
        break;
      case "problemChanged":
        state.openHints.clear();
        state.testStatus = {};
        break;
      default:
        break;
    }
  });

  /* ================= user actions ================= */

  el.btnStart.addEventListener("click", () => vscode.postMessage({ command: "start" }));
  el.btnPause.addEventListener("click", () => vscode.postMessage({ command: "pause" }));
  el.btnResume.addEventListener("click", () => vscode.postMessage({ command: "resume" }));
  el.btnComplete.addEventListener("click", () => vscode.postMessage({ command: "complete" }));

  function switchTab(target) {
    const isSample = target === "sample";
    el.tabSample.classList.toggle("is-active", isSample);
    el.tabEdge.classList.toggle("is-active", !isSample);
    el.panelSample.hidden = !isSample;
    el.panelEdge.hidden = isSample;
  }
  el.tabSample.addEventListener("click", () => switchTab("sample"));
  el.tabEdge.addEventListener("click", () => switchTab("edge"));

  /* ================= boot ================= */
  vscode.postMessage({ command: "ready" });
})();