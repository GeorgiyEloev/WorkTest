import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, TextField } from "@mui/material";

const AddNew = () => {
  const [newbook, setNew] = useState({
    name: "",
    author: "",
    year: "",
    description: "",
  });

  const navigation = useNavigate();

  const handleChange = (nameKey, event) => {
    setNew({
      ...newbook,
      [nameKey]: event,
    });
  };

  const { name, author, year, description } = newbook;

  const addNewBook = async () => {
    await axios.post("http://localhost:8000/addBook", newbook);
    setNew({
      name: "",
      author: "",
      year: "",
      description: "",
    });
    navigation("/main");
  };

  return (
    <div className="main">
      <Box>
        <h1>New book:</h1>
        <TextField
          label="name"
          id="outlined-basic"
          variant="outlined"
          value={name}
          onChange={(event) => handleChange("name", event.target.value)}
        />
        <TextField
          label="author"
          id="outlined-basic"
          variant="outlined"
          value={author}
          onChange={(event) => handleChange("author", event.target.value)}
        />
        <TextField
          label="year"
          id="outlined-basic"
          variant="outlined"
          value={year}
          onChange={(event) => handleChange("year", event.target.value)}
        />
        <TextField
          label="description"
          id="outlined-basic"
          variant="outlined"
          value={description}
          onChange={(event) => handleChange("description", event.target.value)}
        />
        <Button variant="outlined" onClick={() => addNewBook()}>
          add new book
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setNew({
              name: "",
              author: "",
              year: "",
              description: "",
            });
            navigation("/main");
          }}
        >
          Cancel
        </Button>
      </Box>
      <Box></Box>
    </div>
  );
};

export default AddNew;
