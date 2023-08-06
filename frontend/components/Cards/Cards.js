import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CardActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; 
import { useUserContext } from 'context/userContext';
import EditEventModal from '../EditModel/EditEventModel';
import { Toaster, toast } from 'react-hot-toast';

const Cards = ({ event, onAttend, onRSVP }) => {
  const { id, handleEdit, user, attendEvents, fetchVirtualEvents } = useUserContext();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedEvent, setEditedEvent] = useState(event);

  const handleAttendClick = async () => {
    if (!user) {
      toast.error('Please log in to attend an event');
      return;
    }

    try {
      await attendEvents(event?._id, user?.id);
      fetchVirtualEvents();
      toast.success('You have successfully attended the event');
    } catch (error) {
      console.error('Error attending event:', error);
      toast.error('Error attending event');
    }
  };

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleRSVPClick = () => {
    onRSVP(event._id);
  };

  const handleModalClose = () => {
    setEditModalOpen(false);
  };

  const handleEventUpdate = async () => {
    if (!user) {
      toast.error('Please log in to edit the event');
      return;
    }

    try {
      await handleEdit(editedEvent._id, editedEvent);
      fetchVirtualEvents();
      console.log('Event updated successfully');
      handleModalClose();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const isAttending = event.participants.includes(user ? user.id : null);
  const isRSVPed = event.participants.includes(user ? user.id : null);

  return (
    <Card sx={{ maxWidth: 280, maxHeight: 300 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {event.title}
          <EditIcon
            style={{ marginLeft: '4rem', cursor: 'pointer' }}
            onClick={handleEditClick}
          />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Date: {event.date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Time: {event.time}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          VirtualLocation: {event.virtualLocation}
        </Typography>
      </CardContent>
      <CardActions>
        {isAttending ? (
          isRSVPed ? (
            <Button
              variant="contained"
              style={{ backgroundColor: 'red', color: 'white' }}
              disabled
            >
              RSVPED
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              style={{ backgroundColor: 'blue', color: 'white' }}
              onClick={handleRSVPClick}
              className="px-4 py-2"
            >
              RSVP
            </Button>
          )
        ) : (
          <Button
            variant="contained"
            style={{ backgroundColor: 'blue', color: 'white' }}
            onClick={handleAttendClick}
            className="px-4 py-2"
          >
            Attend
          </Button>
        )}
      </CardActions>

      <EditEventModal
        isOpen={editModalOpen}
        event={editedEvent}
        onUpdate={handleEventUpdate}
        onClose={handleModalClose}
        onEventChange={setEditedEvent}
      />
      <Toaster position="top-center" reverseOrder={false} />
    </Card>
  );
};

export default Cards;
