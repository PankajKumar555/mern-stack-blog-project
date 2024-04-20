import mongoose from "mongoose";

const AddBlogSchema = new mongoose.Schema({
  blogTitle: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  blogBody: {
    type: String,
  },
  email: {
    type: String,
  },
  username: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const blog = mongoose.model("Blog", AddBlogSchema);

export default blog;
