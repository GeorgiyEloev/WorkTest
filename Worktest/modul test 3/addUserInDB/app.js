const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: String,
  email: String,
  password: String
});

const Task = mongoose.model("users", userSchema);

app.use(cors());

const url =
  "mongodb+srv://user:user@cluster0.fiygj.mongodb.net/TestEducationDB?retryWrites=true&w=majority";
mongoose.connect(url);

app.use(express.json());

app.post("/addUser", (req, res) => {
  if (
    req.body.hasOwnProperty("fullName") &&
    req.body.hasOwnProperty("email") &&
    req.body.hasOwnProperty("password")
  ) {
    const task = new Task(req.body);
    task.save().then(() => {
      Task.find().then((result) => {
        res.send({ data: result });
      });
    });
  } else {
    res.status(422).send("Error! Неверные параметры!");
  }
});


app.listen(8000, () => {
  console.log("listening on port 8000!");
});
