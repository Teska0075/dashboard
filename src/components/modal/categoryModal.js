import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField, Typography } from '@mui/material';
import axios from 'axios';

const style = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  //   height: '60%',
  bgcolor: 'background.paper',
  border: '1px solid grey',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
};

export default function CategoryModal({
  isModal,
  catData,
  setCatData,
  modalToggle,
  isSubmit,
  setIsSubmit,
  newCategory,
}) {
  const [newCategoryObj, setNewCategoryObj] = React.useState({
    title: '',
    description: '',
    categoryImg: 'url',
    categoryRating: '',
  });

  const changeHandler = (e) => {
    if (newCategory) {
      setNewCategoryObj({ ...newCategoryObj, [e.target.name]: e.target.value });
    } else {
      setCatData({ ...catData, [e.target.name]: e.target.value });
    }
  };

  const toggleSubmit = () => {
    console.log(isSubmit);
    setIsSubmit(!isSubmit);
  };

  const updateCategory = async () => {
    try {
      const res = await axios.put('http://localhost:8000/categories', catData);
      modalToggle();
    } catch (error) {
      console.log('UC', error);
    }
  };

  const addCategory = async () => {
    try {
      const res = await axios.post('http://localhost:8000/categories', newCategoryObj);
      modalToggle();
    } catch (error) {
      console.log('AC', error);
    }
  };

  const handleClose = () => modalToggle();

  return (
    <Box>
      <Modal
        open={isModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h3">{newCategory ? 'Шинэ' : ' Өөрчлөх'} категори</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', width: '100%' }}>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              name="title"
              value={newCategory ? newCategoryObj.title : catData.title}
              onChange={changeHandler}
            />
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              name="description"
              value={newCategory ? newCategoryObj.description : catData.description}
              onChange={changeHandler}
            />
            <TextField
              id="outlined-basic"
              label="Image"
              variant="outlined"
              type="file"
              name="categoryImg"
              onChange={async (e) => {
                console.log(e.target.files[0]);
                const imgData = new FormData();
                imgData.append('image', e.target.files[0]);
                const res = await axios.post('http://localhost:8000/upload', imgData);
                console.log(res.data.imgUrl);
                setNewCategoryObj({ ...newCategoryObj, categoryImg: res.data.imgUrl });
              }}
            />
            <TextField
              id="outlined-basic"
              label="Rating"
              variant="outlined"
              type="number"
              name="categoryRating"
              value={newCategory ? newCategoryObj.categoryRating : catData.categoryRating}
              onChange={changeHandler}
            />
            <Button
              onClick={() => {
                if (newCategory) {
                  addCategory();
                } else {
                  updateCategory();
                }
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
