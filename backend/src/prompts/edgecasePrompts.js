module.exports.buildEdgeCasePrompt = (problem) => {

return `
You are an expert Competitive Programming problem setter.

Given the following Codeforces problem, generate exactly THREE additional test cases.

Problem Name:
${problem.problemName}

Problem Statement:
${problem.statement}

Official Sample Tests:
${JSON.stringify(problem.sampleTests, null, 2)}

Generate exactly these three test cases:

1.
Title: General Case
unlockAfter: 0

Purpose:
A representative testcase that validates the main algorithm.

2.
Title: Boundary Case
unlockAfter: 1

Purpose:
Use minimum or boundary constraints.

3.
Title: Tricky Case
unlockAfter: 3

Purpose:
Design a testcase that is likely to expose common implementation mistakes.

Rules:

- Compute the expected output correctly.
- Do not reuse the official samples.
- Return ONLY valid JSON.
- Do not include markdown.
- Do not explain anything.

Return exactly this schema:

{
  "edgeCases":[
    {
      "title":"",
      "description":"",
      "unlockAfter":0,
      "input":"",
      "expectedOutput":""
    },
    {
      "title":"",
      "description":"",
      "unlockAfter":1,
      "input":"",
      "expectedOutput":""
    },
    {
      "title":"",
      "description":"",
      "unlockAfter":3,
      "input":"",
      "expectedOutput":""
    }
  ]
}
`;

};