const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(config);

app.post('/generate', async (req, res) => {
  const { name, job, skills, experience } = req.body;
  const prompt = `Create a resume for ${name} applying for ${job}. Skills: ${skills}. Experience: ${experience}`;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: 300
  });

  res.json({ resume: response.data.choices[0].text });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
