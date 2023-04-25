const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const bodyParser = require("body-parser");
require("dotenv").config({
  path: __dirname + "/.env",
});

const app = express();
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

// Routes
app.get("/", async (req, res) => {
  res.send(response);
});

app.post("/openai-image", async (req, res) => {
  let requestBody = req.body;
  let prompt = requestBody.prompt;
  let n = requestBody.n;
  let size = requestBody.size;
  const response = await openai.createImage({
    prompt: prompt,
    n: n,
    size: size,
  });
  image_url = response.data.data[0].url;
  res.send(image_url);
});

app.post("/openai-completion", async (req, res) => {
  let requestBody = req.body;
  let messages = requestBody.messages;
  const response = await openai.createChatCompletion({
    model: "gpt-4",
    messages: messages,
  });
  completion = response.data.choices;
  res.send(JSON.stringify(completion));
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
