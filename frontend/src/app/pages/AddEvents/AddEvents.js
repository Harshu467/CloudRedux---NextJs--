import React, { useState } from 'react';
import { Button, CssBaseline, TextField, Typography, Box, Grid, Dialog,DialogTitle,DialogContent,DialogActions } from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { Toaster,toast } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useUserContext } from 'context/userContext';

const AddEvents= () => {
  const {id,user} = useUserContext()
  const router = useRouter()
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    virtualLocation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const validateForm = () => {
    const newErrors = {
      login:'',
      title: '',
      description: '', 
      date: '',
      time: '',
      virtualLocation: '',
    };

    let formIsValid = true;
    if(!user){
      newErrors.login = 'You Need to login to create Events';
      toast.error(newErrors.login);
      formIsValid = false;
      return;
    }
    if (!formData.title) {
      newErrors.title = 'Title is required';
      toast.error(newErrors.title);
      formIsValid = false;
      return;
    }
    if(!formData.description){
      newErrors.description = 'Description is required';
      toast.error(newErrors.description);
      formIsValid = false;
      return;
    }
    if(!formData.date){
      newErrors.date = 'Date is required';
      toast.error(newErrors.date);
      formIsValid = false;
      return;
    }
    else if(formData.date < Date.now()){
      newErrors.date = 'Date is invalid';
      toast.error(newErrors.date);
      formIsValid = false;
      return;
    }
    if(!formData.time){
      newErrors.time = 'Time is required';
      toast.error(newErrors.time);
      formIsValid = false;
      return;
    }
    else if(formData.time < Date.now()){
      newErrors.time = 'Time is invalid';
      toast.error(newErrors.time);
      formIsValid = false;
      return;
    }
    if(!formData.virtualLocation){
      newErrors.virtualLocation = 'Virtual Location is required';
      toast.error(newErrors.virtualLocation);
      formIsValid = false;
      return;
    }
    return formIsValid;
  }
  const handleSubmit = async (e) => {
     e.preventDefault();
    console.log("Handle Submit")
    const formIsValid = validateForm();
    if (!formIsValid) {
      return;
    }

    try {
      const newEvent = { ...formData, id: Date.now(), organizer: id };
      const response = await axios.post(`${process.env.BASE_URL}/createEvent/${id}`, newEvent);
     console.log(response)
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        virtualLocation: '',
      });
      toast.success('Event created successfully!');
      router.replace(`/profile/${id}`)
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'An error occurred while adding the event.');
    }
  };
 


  return (
    <>
    <CssBaseline />
    <Grid container justifyContent="center" component="main" style={{alignSelf:'center'}} sx={{ height: 'auto',  }}>
      <Grid item xs={12} sm={8} md={5} component={Box} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Create New Event
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              onChange={handleChange}
              id="title"
              name="title"
              value={formData.title}
              label="Event Title"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              onChange={handleChange}
              id="description"
              name="description"
              value={formData.description}
              label="Event Description"
              multiline
              rows={4}
            />
            <TextField
              margin="normal"
              fullWidth
              onChange={handleChange}
              id="date"
              name="date"
              value={formData.date}
              label="Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              onChange={handleChange}
              id="time"
              name="time"
              value={formData.time}
              label="Time"
              type="time"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              onChange={handleChange}
              id="virtualLocation"
              name="virtualLocation"
              value={formData.virtualLocation}
              label="Virtual Location (URL or Platform Link)"
            />
            <Button type="submit" fullWidth variant="contained" style={{backgroundColor:'blue',color:'white'}} sx={{ mt: 3, mb: 2 }}>
              Add Event
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
    <Toaster position="top-center" reverseOrder={false} />
  </>
  );
};

export default AddEvents;