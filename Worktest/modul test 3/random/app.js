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

app.get("/random", (req, res) => {
  const num = req.query.count;
  const random = [];
  for (let i = 0; i < num; i++) {
    random.push(Math.floor(Math.random() * 10000));
  }
	res.send({ data: random });
});

app.listen(8000, () => {
  console.log("listening on port 8000!");
});
