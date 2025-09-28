import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const HF_KEY = process.env.HF_KEY;
const MODEL = process.env.MODEL_NAME;

app.post("/ask", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${MODEL}`,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${HF_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 30000, // 30 seconds
      }
    );

    // Hugging Face outputs for summarization
    const text =
      response.data?.[0]?.summary_text ||
      response.data?.[0]?.generated_text ||
      "No response from model";

    res.json({ result: text });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get response from model" });
  }
});

app.listen(PORT, () => {
  console.log(`AI backend running on http://localhost:${PORT}`);
});
