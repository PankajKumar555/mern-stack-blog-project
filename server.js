import express from "express";
import dotenv from "dotenv";
import Connection from "./database/db.js";
import Routes from "./routes/route.js";
import path from "path";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/addNewBlog", Routes);
app.use("/", Routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server is working on port ${PORT}`);
});

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const URL =
  process.env.MONGODB_URI ||
  `mongodb+srv://${USERNAME}:${PASSWORD}@blog.zjzn5md.mongodb.net/?retryWrites=true&w=majority&appName=Blog`;

Connection(URL);
