const OpenAI = require("openai");

const client = new OpenAI({
  baseURL: "https://integrate.api.nvidia.com/v1",
  apiKey: process.env.NVIDIA_API_KEY,
});

const summarizeText = async (text) => {
  try {
    if (!process.env.NVIDIA_API_KEY) {
      throw new Error("NVIDIA_API_KEY missing");
    }

    const response = await client.chat.completions.create({
      model: "meta/llama-3.1-8b-instruct",
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
      temperature: 0.4,
      max_tokens: 200,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("NVIDIA AI ERROR:", error);
    throw error;
  }
};

module.exports = summarizeText;