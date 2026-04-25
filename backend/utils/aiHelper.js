const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const summarizeText = async (text) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash"
  });

  const prompt = `
  Summarize this note in short and professional way:

  ${text}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const summary = response.text();

  return summary;
};

module.exports = summarizeText;