const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post('/', async (req, res) => {
    const { prompt } = req.body;
    const fixed_prompt = "Please categorize this review as Positive, Negative, or Neutral, and provide a concise answer without additional details.";
    const result = await model.generateContent([prompt, fixed_prompt]);
    return res.json({ result: result.response.text() });
});





module.exports = router;
