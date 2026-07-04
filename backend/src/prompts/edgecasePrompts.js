module.exports.buildEdgeCasePrompt = (problem) => {

return `
You are an expert Competitive Programming problem setter.

Given the following Codeforces problem, generate EXACTLY THREE additional test cases.

Problem Name:
${problem.problemName}

Problem Statement:
${problem.statement}

Official Sample Tests:
${JSON.stringify(problem.sampleTests, null, 2)}

Generate exactly these test cases:

1.
Title: General Case
unlockAfter: 1

Purpose:
A normal testcase that validates the main algorithm.

2.
Title: Edge Case
unlockAfter: 2

Purpose:
A small boundary testcase that exposes common mistakes.

3.
Title: Corner Case
unlockAfter: 3

Purpose:
A tricky testcase that is likely to break incorrect solutions.

IMPORTANT RULES:

- NEVER reuse the official samples.
- ALWAYS compute the expected output correctly.
- Keep every generated testcase SMALL.
- The total input should NEVER exceed 20 lines.
- Never generate huge arrays.
- Never generate stress tests.
- Never use maximum constraints.
- Prefer logical edge cases over large inputs.
- Every testcase should be readable by a human.
- Return ONLY valid JSON.
- Do NOT include markdown.
- Do NOT include explanations.
- Do NOT include reasoning.
- Do NOT output any text before or after the JSON.

Return exactly this schema:

{
  "edgeCases":[
    {
      "title":"General Case",
      "description":"",
      "unlockAfter":1,
      "input":"",
      "expectedOutput":""
    },
    {
      "title":"Edge Case",
      "description":"",
      "unlockAfter":2,
      "input":"",
      "expectedOutput":""
    },
    {
      "title":"Corner Case",
      "description":"",
      "unlockAfter":3,
      "input":"",
      "expectedOutput":""
    }
  ]
}
`;

};