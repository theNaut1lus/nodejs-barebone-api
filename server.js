require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(express.json());

const subscribersRouter = require("./routes/subscribers");
app.use("/subscribers", subscribersRouter);
//localhost:3000/subscribers/<anything-after> goes to above

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
