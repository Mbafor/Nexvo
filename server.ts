// server.ts
import dotenv from "dotenv";
dotenv.config(); // 🔹 MUST be first

import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import OpenAI from "openai";

const PORT = 3001;

// Check if API key is loaded
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY is missing. Please check your .env file.");
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// ----------------------
// CV Rewrite Endpoint
// ----------------------
app.post("/api/rewrite", async (req, res) => {
  try {
    const { text, context = "general" } = req.body || {};
    if (!text || !text.trim()) return res.status(400).json({ error: "Text is required" });

    const prompts: Record<string, string> = {
      summary: "Rewrite this professional summary to be more compelling and impactful. Use strong action words:",
      experience: "Rewrite this work experience to be more achievement-focused with strong action verbs:",
      general: "Rewrite this text to be more professional and impactful for a CV:",
    };

    const contextPrompt = prompts[context] || prompts.general;
    const fullPrompt = `${contextPrompt}\n\n"${text}"\n\nReturn only the improved text, no quotes or explanations:`;

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: fullPrompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const rewrittenText = (aiResponse.choices[0].message?.content || "").trim().replace(/^"|"$/g, "");

    if (!rewrittenText) {
      console.error("❌ OpenAI returned empty text:", aiResponse);
      return res.status(500).json({ error: "OpenAI returned empty text" });
    }

    res.json({ rewritten: rewrittenText });

  } catch (err: any) {
    console.error("❌ REWRITE ERROR:", err);

    // Detailed error for debugging
    const message = err?.message || "Unknown error";
    const status = err?.status || 500;
    const responseData = err?.response || undefined;

    res.status(status).json({
      error: message,
      details: responseData,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 OpenAI server running on http://localhost:${PORT}`);
});
