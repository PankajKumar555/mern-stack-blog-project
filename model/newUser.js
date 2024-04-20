import mongoose from "mongoose";

const newUserSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userSignUpData = mongoose.model("userData", newUserSchema);

export default userSignUpData;
