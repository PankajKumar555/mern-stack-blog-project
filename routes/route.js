import express, { response } from "express";
import blog from "../model/addNewTodo.js";
import contact from "../model/contactEmail.js";
import nodemailer from "nodemailer";
import userSignUpData from "../model/newUser.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Token from "../model/token.js";

const route = express.Router();
dotenv.config();

route.post("/", async (req, res) => {
  try {
    const newBlog = await blog.create({
      blogTitle: req.body.blogTitle,
      imageUrl: req.body.imageUrl,
      blogBody: req.body.blogBody,
      username: req.body.username,
      email: req.body.email,
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

route.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };
    const existingUser = await userSignUpData.findOne({
      email: userData.email,
    });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }
    const newUser = await userSignUpData.create(userData);

    await newUser.save();

    return res.status(200).json({ msg: "signup successfully" });
  } catch (error) {
    console.error("Error creating in sign up:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

route.post("/login", async (req, res) => {
  const user = await userSignUpData.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ msg: "email does not match" });
  }
  try {
    const match = await bcrypt.compare(req.body.password, user.password);

    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFERSH_SECRET_KEY
      );

      const newToken = await Token.create({ token: refreshToken });
      await newToken.save();

      return res.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        email: user.email,
        username: user.username,
      });
    } else {
      return res.status(400).json({ msg: "password does not match" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error while login" });
  }
});

route.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pankajsing555@gmail.com",
      pass: "ugwg tyxl wdoq oasn",
    },
  });

  try {
    const newContactDetails = await contact.create({
      name: name,
      email: email,
      message: message,
      createdAt: Date.now(),
    });

    await newContactDetails.save();

    const mailOptions = {
      from: "pankajsing555@gmail.com",
      to: "pankajsing555@gmail.com",
      subject: "New Contact Message From Blogs Project",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Error submitting form");
      } else {
        console.log("Email sent:", info.response);
        res.status(201).send("Form submitted successfully");
      }
    });

    return res.status(200).json(newContactDetails);
  } catch (error) {
    console.error("Error sending contact:", error);
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

route.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedData = await blog.findByIdAndDelete(id);
    if (deletedData) {
      return res.status(200).json({ message: "Data deleted successfully" });
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch {
    console.error("Error deleting data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

route.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { blogBody } = req.body;
  try {
    const updatedData = await blog.findByIdAndUpdate(
      id,
      { blogBody },
      { new: true }
    );
    return res.status(200).json(updatedData);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default route;
