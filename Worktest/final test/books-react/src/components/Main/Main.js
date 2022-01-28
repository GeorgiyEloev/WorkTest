import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button } from "@mui/material";

const Main = () => {
  const [allBooks, setAllBooks] = useState([]);

  const navigation = useNavigate();

  const uploadAllBooks = async () => {
    await axios.get("http://localhost:8000/allBooks").then((res) => {
      setAllBooks(res.data.data);
    });
  };

  const deleteRecord = async (id) => {
    await axios
      .delete(`http://localhost:8000/deleteBook?_id=${id}`)
      .then((res) => {
        setAllBooks(res.data.data);
      });
  };

  useEffect(() => {
    uploadAllBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  return (
    <div className="main">
      <Box>
        <h1>Книги:</h1>
        <Button variant="outlined" onClick={() => navigation("/addNew")}>
          add new book
        </Button>
      </Box>
      <Box>
        {allBooks.map((book, index) => (
          <div key={index}>
            <h3 onClick={() => navigation(`/details/${book._id}`)}>
              {book.name}
            </h3>
            <Button variant="outlined" onClick={() => deleteRecord(book._id)}>
              delete book
            </Button>
          </div>
        ))}
      </Box>
    </div>
  );
};

export default Main;
