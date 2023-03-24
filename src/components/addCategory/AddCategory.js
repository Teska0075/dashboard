import { React, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Modal, TextField, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

export default function AddCategory({ open, handleClose }) {
  const [changeTitle, setChangeTitle] = useState();

  const [changeDesc, setChangeDesc] = useState();

  const [changeCategoryImg, setChangeCategoryImg] = useState();

  const [changeCategoryRating, setChangeCategoryRating] = useState();

  const handleSet = () => {
    // console.log(id);
    axios
      .post(`http://localhost:8000/category`, {
        title: changeTitle,
        description: changeDesc,
        categoryImg: changeCategoryImg,
        categoryRating: changeCategoryRating,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    handleClose();
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal keepMounted open={open} onClose={handleClose}>
        <Box component="form" sx={style}>
          <Typography>Add new category</Typography>
          <TextField
            fullWidth
            id="outlined-controlled"
            label="Title"
            onChange={(e) => {
              setChangeTitle(e.target.value);
            }}
          />
          <TextField
            fullWidth
            id="outlined-controlled"
            label="Description"
            onChange={(e) => {
              setChangeDesc(e.target.value);
            }}
          />
          <TextField
            fullWidth
            id="outlined-controlled"
            label="Image"
            onChange={(e) => {
              setChangeCategoryImg(e.target.value);
            }}
          />
          <TextField
            fullWidth
            id="outlined-controlled"
            label="Rating"
            onChange={(e) => {
              setChangeCategoryRating(e.target.value);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleSet();
            }}
          >
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
