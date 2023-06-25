const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
const { connectDB } = require("./mongodb/connect.js");
const postRoutes = require("./routes/postRoutes");
const dalleRoutes = require("./routes/dalleRoutes");
const cloudinary = require("cloudinary").v2;

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(morgan("common"));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get("/", async (req, res) => {
  res.send("Hello from Server");
});

try {
  connectDB(process.env.MONGO_URL);
  app.listen(8080, () => {
    console.log("Server is running on PORT:8080");
  });
} catch (error) {
  console.log(error);
}
