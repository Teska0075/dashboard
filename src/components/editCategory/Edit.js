import { React, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Modal, TextField } from '@mui/material';

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

export default function BasicModal({ open, handleClose, id, title, description, categoryImg, categoryRating, render }) {
  const [changeTitle, setChangeTitle] = useState(title);

  const [changeDesc, setChangeDesc] = useState(description);

  const [changeCategoryImg, setChangeCategoryImg] = useState(categoryImg);

  const [changeCategoryRating, setChangeCategoryRating] = useState(categoryRating);

  const handleSet = (id) => {
    console.log(id);
    axios
      .put(`http://localhost:8000/category/${id}`, {
        title: changeTitle,
        description: changeDesc,
        categoryImg: changeCategoryImg,
        categoryRating: changeCategoryRating,
      })
      .then((res) => {
        console.log(res.data);
        render();
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
          <TextField
            fullWidth
            id="outlined-controlled"
            label="Title"
            defaultValue={title}
            onChange={(e) => {
              setChangeTitle(e.target.value);
            }}
          />
          <TextField
            fullWidth
            id="outlined-controlled"
            label="Description"
            defaultValue={description}
            onChange={(e) => {
              setChangeDesc(e.target.value);
            }}
          />
          <TextField
            fullWidth
            id="outlined-controlled"
            label="Image"
            defaultValue={categoryImg}
            onChange={(e) => {
              setChangeCategoryImg(e.target.value);
            }}
          />
          <TextField
            fullWidth
            id="outlined-controlled"
            label="Rating"
            defaultValue={categoryRating}
            onChange={(e) => {
              setChangeCategoryRating(e.target.value);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleSet(id);
            }}
          >
            Done
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
