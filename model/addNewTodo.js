import mongoose from "mongoose";

const AddBlogSchema = new mongoose.Schema({
  blogTitle: {
    type: String,
    // required: true,
  },
  imageUrl: {
    type: String,
  },
  blogBody: {
    type: String,
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const blog = mongoose.model("Blog", AddBlogSchema);

export default blog;
