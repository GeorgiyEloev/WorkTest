const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const { Schema } = mongoose;

const bookSchema = new Schema({
  years: String,
  author: String,
  name: String,
  publisher: String,
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
    req.body.hasOwnProperty("years") &&
    req.body.hasOwnProperty("author") &&
    req.body.hasOwnProperty("name") &&
    req.body.hasOwnProperty("publisher")
  ) {
    const book = new Books(req.body);
    book.save().then(() => {
      Books.find().then((result) => {
        res.send({ data: result });
      });
    });
  } else {
    res.status(422).send("Error!");
  }
});

app.delete("/delBook", (req, res) => {
  const id = req.query._id;
  if (id) {
    Books.deleteOne({ _id: id }).then(() => {
      Books.find().then((result) => {
        res.send({ data: result });
      });
    });
  } else {
    res.status(422).send("Error!");
  }
});

app.patch("/updateBook", (req, res) => {
  const body = req.body;
  if (
    body.hasOwnProperty("_id") &&
    (body.hasOwnProperty("years") ||
    body.hasOwnProperty("author") ||
    body.hasOwnProperty("name") ||
    body.hasOwnProperty("publisher"))
  ) {
    Books.updateOne({ _id: body._id }, body).then(() => {
      Books.find().then((result) => {
        res.send({ data: result });
      });
    });
  } else {
    res.status(422).send("Error!");
  }
});

app.listen(8000, () => {
  console.log("listening on port 8000!");
});
