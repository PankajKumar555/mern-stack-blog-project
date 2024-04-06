import express from "express";
import blog from "../model/addNewTodo.js";

const route = express.Router();

route.post("/", async (req, res) => {
  try {
    const newBlog = await blog.create({
      blogTitle: req.body.blogTitle,
      imageUrl: req.body.imageUrl,
      blogBody: req.body.blogBody,
      createdAt: Date.now(),
    });

    await newBlog.save();

    return res.status(200).json(newBlog);
  } catch (error) {
    console.error("Error creating blog post:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

route.get("/", async (req, res) => {
  try {
    const getBlogs = await blog.find();
    return res.status(200).json(getBlogs);
  } catch (error) {
    console.error("Error getting from blogs:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default route;
