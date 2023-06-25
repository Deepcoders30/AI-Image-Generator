const router = require("express").Router();
const dotenv = require("dotenv");
dotenv.config();
const cloudinary = require("cloudinary").v2;
const Post = require("../mongodb/models/post");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route("/").get((req, res) => {
  res.send("Hello from dallE");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = aiResponse.data.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error?.response.data.error.message);
    res.status(500).send(error?.response.data.error.message);
  }
});

module.exports = router;
