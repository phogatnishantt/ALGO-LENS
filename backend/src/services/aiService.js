const { GoogleGenAI } = require("@google/genai");
const { buildHintPrompt } = require("../prompts/hintPrompts");
const { buildEdgeCasePrompt } = require("../prompts/edgecasePrompts");
console.log("Gemini key exists:", !!process.env.GEMINI_API_KEY);
console.log("Gemini key prefix:", process.env.GEMINI_API_KEY?.substring(0, 5));

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const generateHints = async (title, statement, constraints) => {

    const prompt = buildHintPrompt(
        title,
        statement,
        constraints
    );

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json"
        }
    });

    let text = response.text;

    text = text.replace(/```json/g, "");
    text = text.replace(/```/g, "");
    text = text.trim();

    console.log("RAW GEMINI HINT RESPONSE:");
    console.log(text);

    return JSON.parse(text);
};

const generateEdgeCases = async (problem) => {

    const prompt = buildEdgeCasePrompt(problem);

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json"
        }
    });

    let text = response.text;

    text = text.replace(/```json/g, "");
    text = text.replace(/```/g, "");
    text = text.trim();

    console.log("RAW GEMINI EDGE RESPONSE:");
    console.log(text);

    const s=text.indexOf("{");
const e=text.lastIndexOf("}");

if(s==-1||e==-1){
    throw new Error("Invalid Gemini Response");
}

return JSON.parse(text.substring(s,e+1));
};

module.exports = {
    generateHints,
    generateEdgeCases
};