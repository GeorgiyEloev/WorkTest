/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Button } from "@mui/material";

const Details = () => {
  const [item, setItem] = useState({
    _id: "",
    name: "",
    author: "",
    year: "",
    description: "",
  });
  let navigation = useNavigate();

  const { id } = useParams();

  useEffect(async () => {
    await axios.get(`http://localhost:8000/oneBook?_id=${id}`).then((res) => {
      setItem(res.data.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  const { name, author, year, description } = item;

  return (
    <div className="main">
      <Box>
        <h2>Книга:</h2>
        <h3>{name}</h3>
      </Box>
      <Box>
        <h2>Автор:</h2>
        <h3>{author}</h3>
      </Box>
      <Box>
        <h2>Год:</h2>
        <h3>{year}</h3>
      </Box>
      <Box>
        <h2>Описание:</h2>
        <h3>{description}</h3>
      </Box>
      <Box>
        <Button variant="outlined" onClick={() => navigation("/main")}>
          Cancel
        </Button>
      </Box>
    </div>
  );
};

export default Details;
