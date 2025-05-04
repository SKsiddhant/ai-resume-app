import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/generate', async (req, res) => {
  try {
    const { name, email, skills, experience } = req.body;

    const prompt = `Generate a professional resume for:
    Name: ${name}
    Email: ${email}
    Skills: ${skills}
    Experience: ${experience}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    });

    const generatedText = response.choices[0].message.content;
    res.json({ resume: generatedText });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate resume' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
