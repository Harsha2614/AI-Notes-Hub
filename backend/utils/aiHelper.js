const { GoogleGenerativeAI } = require("@google/generative-ai");

const summarizeText = async (text) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY missing");
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const prompt = `Summarize this note professionally:\n\n${text}`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    return response.text();

  } catch (error) {
    console.error("GEMINI ERROR:", error);
    throw error;
  }
};

module.exports = summarizeText;