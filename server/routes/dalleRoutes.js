import express from "express";
import * as dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello from dalle");
});

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  const url = "https://api.wizmodel.com/sdapi/v1/txt2img";

  const requestData = {
    prompt,
    steps: 100,
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.DALLE_API}`,
  };

  async function generateImage() {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        res.status(200).json({ image: data.images[0] });
      } else {
        console.error(`Request failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error(`An error occurred: ${error}`);
      res.status(500).send(error);
    }
  }

  generateImage();
});

export default router;
