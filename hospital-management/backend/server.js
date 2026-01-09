import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());


connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
