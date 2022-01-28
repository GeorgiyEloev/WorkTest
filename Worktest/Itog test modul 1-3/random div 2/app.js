const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const { Schema } = mongoose;

const taskSchema = new Schema({
  name: String,
  text: String,
  isCheck: Boolean,
});

const Task = mongoose.model("tasks", taskSchema);

app.use(cors());

const url =
  "mongodb+srv://user:user@cluster0.fiygj.mongodb.net/TestEducationDB?retryWrites=true&w=majority";
mongoose.connect(url);

app.use(express.json());

app.get("/randomDiv2", (req, res) => {
  const count = req.query.count;
  const random = [];
  while (random.length < count) {
    let num = Math.floor(Math.random() * 10000);
    if (num % 2 === 0) {
      random.push(num);
    }
  }
  res.send({ data: random });
});

app.listen(8000, () => {
  console.log("listening on port 8000!");
});
