const Post = require("../mongodb/models/post");
const cloudinary = require("cloudinary").v2;

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).success({ success: false, message: error });
  }
};

const createPost = async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;

    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({ name, prompt, photo: photoUrl.url });
    console.log(newPost)

    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error });
  }
};

module.exports = { getAllPosts, createPost };
