const { GoogleGenAI } = require("@google/genai");
const { buildHintPrompt } = require("../prompts/hintPrompts");
const { buildEdgeCasePrompt } = require("../prompts/edgecasePrompts");

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

    console.log(response);

    let text = response.text;

    text = text.replace(/```json/g, "");
    text = text.replace(/```/g, "");
    text = text.trim();

    console.log("RAW GEMINI RESPONSE:");
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

    console.log("RAW GEMINI RESPONSE:");
    console.log(text);

    return JSON.parse(text);

};



module.exports = {
    generateHints,
    generateEdgeCases
};