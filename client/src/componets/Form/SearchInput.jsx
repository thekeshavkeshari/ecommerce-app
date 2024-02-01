import React, { useState } from "react";
import { Button, TextField, Box, Paper } from "@mui/material";
import { MdSearch, MdClose } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { useSearch } from "../../context/Search";
import { useNavigate } from "react-router-dom";

const FloatingSearchButton = () => {
  const [expanded, setExpanded] = useState(false);
  const [searchText, setSearchText] = useSearch();
  const navigate = useNavigate();

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleSearch = async () => {
    try {
      console.log("Searching for:", searchText);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/search/${searchText.keyword}`
      );
      console.log(data.product);
      setSearchText({ ...searchText, results: data.product });
      navigate('/search')
    } catch (error) {console.error();}
  };

  return (
    <Box
      position="fixed"
      bottom={90}
      className="border rounded-full bg-white"
      right={16}
      zIndex={40}
    >
      <IconButton
        color="primary"
        variant="outlined"
        size="large"
        onClick={handleExpand}
      >
        {expanded ? <MdClose /> : <MdSearch />}
      </IconButton>
      {expanded && (
        <Paper
          elevation={3}
          style={{
            position: "absolute",
            top: -153,
            right: 0,
            width: 250,
            padding: 16,
          }}
        >
          <TextField
            label="Search Product"
            variant="outlined"
            fullWidth
            value={searchText.keyword}
            onChange={(e) => setSearchText({...searchText,keyword:e.target.value})}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            style={{ marginTop: 16 }}
          >
            Search
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default FloatingSearchButton;
