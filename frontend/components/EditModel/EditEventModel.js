import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useUserContext } from 'context/userContext';
import axios from 'axios';
import { toast,Toaster } from 'react-hot-toast';

const EditEventModal = ({ event, isOpen, onClose, onUpdate }) => {
  // const [updatedEvent, setUpdatedEvent] = useState(event);
  const [eventData, seteventData] = useState({...event})
  const {id,editEvents,user,events,fetchVirtualEvents } = useUserContext();
  useEffect(() => {
    fetchVirtualEvents();
  }, []);
  
  const handleFieldChange = (fieldName, value) => {
    seteventData({
      ...eventData,
      [fieldName]: value,
    });
  };

  const handleUpdate = async () => {
    if(!user)
    {
      toast.error('Please login to update event')
      onClose();
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/eventsUpdate/${id}/${eventData._id}`,
        eventData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success(response?.data?.message);
      fetchVirtualEvents();
      onClose();
    } catch (error) {
      toast.error(error?.response?.data.message);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Event</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Make changes to the event details:
        </DialogContentText>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={eventData?.title || ''}
              onChange={(e) => handleFieldChange('title', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              value={eventData?.description || ''}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date"
              variant="outlined"
              type="date"
              fullWidth
              value={eventData?.date || ''}
              onChange={(e) => handleFieldChange('date', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Time"
              variant="outlined"
              type="time"
              fullWidth
              value={eventData?.time || ''}
              onChange={(e) => handleFieldChange('time', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Virtual Location"
              variant="outlined"
              fullWidth
              value={eventData?.virtualLocation || ''}
              onChange={(e) => handleFieldChange('virtualLocation', e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEventModal;
