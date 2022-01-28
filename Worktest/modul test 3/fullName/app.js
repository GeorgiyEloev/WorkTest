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

app.get("/nameShort", (req, res) => {
  let fullName = req.query.name;
  let shortName = "";

  const arrName = fullName.split(" ");
	for (let i in arrName) {
		shortName += arrName[i][0];
	}
  res.send({ data: shortName });
});

app.listen(8000, () => {
  console.log("listening on port 8000!");
});
