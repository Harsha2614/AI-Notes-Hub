const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const summarizeText = async (text) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY missing");
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional note summarizer.",
        },
        {
          role: "user",
          content: `Summarize this note in a short professional way:\n\n${text}`,
        },
      ],
      max_tokens: 200,
      temperature: 0.5,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("OPENAI ERROR:", error);
    throw error;
  }
};

module.exports = summarizeText;