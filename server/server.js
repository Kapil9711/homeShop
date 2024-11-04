import express from "express";
const app = express();
import connectDb from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

// body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// endpoints

app.get("/", (req, res) => {
  res.send("Server is running");
});

// spining server
const PORT = process.env.PORT || 8000;
const MODE = process.env.MODE || "production";

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    // starting server only if connection to mongoDB successfull
    app.listen(PORT, () => {
      console.log(`Server is listening on Port ${PORT} in ${MODE} mode.`);
    });
  } catch (error) {
    console.log(`Aborting server due to some issue connecting to db`);
  }
};

start();
