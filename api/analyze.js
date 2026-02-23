import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { comment } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an HR sentiment analysis assistant. Analyze employee feedback and respond in JSON."
        },
        {
          role: "user",
          content: `Analyze this employee comment and return JSON with:
          {
            "sentiment": "Positive | Neutral | Negative",
            "confidence": "0-100%",
            "explanation": "short explanation"
          }

          Comment: ${comment}`
        }
      ]
    });

    const output = completion.choices[0].message.content;
    res.status(200).send(output);

  } catch (error) {
    res.status(500).json({ error: "Analysis failed" });
  }
}