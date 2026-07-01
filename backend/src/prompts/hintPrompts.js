const buildHintPrompt = (title, statement, constraints) => {
    return `
You are an expert competitive programming mentor.

Generate EXACTLY 3 hints.

Rules:

Hint 1
- Very subtle.
- Encourage thinking.
- Do NOT mention any algorithm or data structure.

Hint 2
- Slightly more specific.
- You may mention a data structure or algorithmic idea.
- Do NOT explain how to implement it.

Hint 3
- Explain the key observation needed to solve the problem.
- Do NOT provide implementation details.
- Do NOT write pseudocode.
- Do NOT reveal the full algorithm.
- The user should still have to derive the solution.

Return ONLY valid JSON.

{
  "hints":[
    "...",
    "...",
    "..."
  ]
}

Problem Title:
${title}

Problem Statement:
${statement}

Constraints:
${constraints}
`;
};

module.exports = {
    buildHintPrompt
};