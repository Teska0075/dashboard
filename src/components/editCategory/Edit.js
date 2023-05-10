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

export default function BasicModal({
  open,
  closeModal,
  categoryData,
  setCategoryData,
  newCategory,
  submit,
  setSubmit,
  getCategory,
}) {
  const [newCategoryObj, setNewCategoryObj] = useState({
    title: '',
    description: '',
    categoryImg: '',
    categoryRating: '',
  });

  const changeHandler = (e) => {
    if (newCategory) {
      setNewCategoryObj({ ...newCategoryObj, [e.target.name]: e.target.value });
    } else {
      setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
    }
  };

  const updateCategory = () => {
    axios
      .put(`http://localhost:8008/category/${categoryData._id}`, { categoryData })
      .then((req, res) => {
        // setRender(!render);
        // handleClose();
      })
      .catch((error) => {
        console.log('ERROR ', error);
      });
    closeModal();
    getCategory();
  };

  const addCategory = async ({ newCategoryObj }) => {
    try {
      const res = await axios.post(`http://localhost:8008/category`, newCategoryObj);
    } catch (error) {
      console.log('error', error);
    }
    closeModal();
    getCategory();
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal keepMounted open={open} onClose={closeModal}>
        <Box component="form" sx={style}>
          <TextField
            fullWidth
            id="outlined-controlled"
            label="Title"
            name="title"
            value={newCategory ? newCategoryObj.title : categoryData.title}
            onChange={changeHandler}
          />
          <TextField
            fullWidth
            id="outlined-controlled"
            label="Description"
            name="description"
            value={newCategory ? newCategoryObj.description : categoryData.description}
            onChange={changeHandler}
          />
          <TextField
            fullWidth
            id="outlined-controlled"
            type="file"
            label="Image"
            name="categoryImg"
            value={newCategory ? newCategoryObj.categoryImg : categoryData.categoryImg}
            onChange={async (e) => {
              console.log(e.target.files[0]);
              const imgData = new FormData();
              imgData.append('image', e.target.files[0]);
              const res = await axios.post('http://localhost:8000/uploads', imgData);
              console.log(res.data.imgUrl);
              setNewCategoryObj({ ...newCategoryObj, categoryImg: res.data.imgUrl });
            }}
          />
          <TextField
            fullWidth
            id="outlined-controlled"
            label="Rating"
            name="categoryRating"
            value={newCategory ? newCategoryObj.categoryRating : categoryData.categoryRating}
            onChange={changeHandler}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (newCategory) {
                console.log('add');
                addCategory({ newCategoryObj });
              } else {
                console.log('update');
                updateCategory();
                console.log(...categoryData);
              }
            }}
          >
            Done
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
