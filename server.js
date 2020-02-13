// server.js
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const bodyParser = require("body-parser");
const User = require("./src/User.model");

const option = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(bodyParser.json());
//ROUTE
app.get("/users", async (req, res) => {
  const users = await User.find();

  res.json(users);
});

app.get("/user-create", async (req, res) => {
  const user = new User({ username: "userTest" });

  await user.save().then(() => console.log("User created"));

  res.send("User created \n");
});

//CONNECT TO DB
app.listen(
  process.env.MONGO_PORT,
  console.log("Server start at http://localhost:8080")
);
mongoose.connect(process.env.DB_CONNECT, option, () =>
  console.log("Connected to DB")
);
