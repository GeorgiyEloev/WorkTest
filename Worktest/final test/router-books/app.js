const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const { Schema } = mongoose;

const bookSchema = new Schema({
  name: String,
  author: String,
  year: String,
  description: String,
});

const Books = mongoose.model("books", bookSchema);

app.use(cors());

const url =
  "mongodb+srv://user:user@cluster0.fiygj.mongodb.net/TestEducationDB?retryWrites=true&w=majority";
mongoose.connect(url);

app.use(express.json());

app.get("/allBooks", (req, res) => {
  Books.find().then((result) => {
    res.send({ data: result });
  });
});

app.post("/addBook", (req, res) => {
  if (
    req.body.hasOwnProperty("name") &&
    req.body.hasOwnProperty("author") &&
    req.body.hasOwnProperty("year") &&
    req.body.hasOwnProperty("description")
  ) {
    const book = new Books(req.body);
    book.save().then(() => {
      Books.find().then((result) => {
        res.send({ data: result });
      });
    });
  } else {
    res.status(422).send("Error! Неверные параметры!");
  }
});

app.delete("/deleteBook", (req, res) => {
  const id = req.query._id;
  if (id) {
    Books.deleteOne({ _id: id }).then(() => {
      Books.find().then((result) => {
        res.send({ data: result });
      });
    });
  } else {
    res.status(422).send("Error! Неверные параметры!");
  }
});

app.get("/oneBook", (req, res) => {
  const id = req.query._id;
  if (id) {
    Books.findOne({ _id: id }).then((result) => {
      res.send({ data: result });
    });
  } else {
    res.status(422).send("Error! Неверные параметры!");
  }
});

app.listen(8000, () => {
  console.log("listening on port 8000!");
});
