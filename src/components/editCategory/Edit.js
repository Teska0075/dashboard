import { React } from 'react';
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

export default function BasicModal({ open, handleClose,  category, setCategory,render,setRender }) {

  const handleSet = () => {
    axios
      .put(`http://localhost:8000/category/${category._id}`, {category})
      .then((req,res) => {
        setRender(!render);
        handleClose();
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
            defaultValue={category.title}
            onChange={(e) => {
              setCategory({...category, [e.target.name]: e.target.value})
            }}
          />
          <TextField
            fullWidth
            id="outlined-controlled"
            label="Description"
            defaultValue={category.description}
            onChange={(e) => {
              setCategory({...category, [e.target.name]: e.target.value})
            }}
          />
          <TextField
            fullWidth
            id="outlined-controlled"
            label="Image"
            defaultValue={category.categoryImg}
            onChange={(e) => {
              setCategory({...category, [e.target.name]: e.target.value})
            }}
          />
          <TextField
            fullWidth
            id="outlined-controlled"
            label="Rating"
            defaultValue={category.categoryRating}
            onChange={(e) => {
              setCategory({...category, [e.target.name]: e.target.value})
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleSet();
            }}
          >
            Done
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
