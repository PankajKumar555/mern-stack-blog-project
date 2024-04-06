import mongoose from "mongoose";

const Connection = async (URL) => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
    });

    console.log("Database is connected successfully");

    mongoose.connection.on("connected", () => {
      console.log("Database is connected successfully");
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Database is disconnected");
    });

    mongoose.connection.on("error", (error) => {
      console.log("Error while connecting the database");
    });
  } catch (error) {
    console.error("Error while connecting the database:", error.message);
  }
};

export default Connection;
