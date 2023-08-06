import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';

import { useUserContext } from '../../../../context/userContext';

const Profile = () => {
  const { user, events } = useUserContext();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleEventClose = () => {
    setSelectedEvent(null);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {user?.firstName} {user?.lastName}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Email: {user?.email}
      </Typography>
      <Divider sx={{ width: '100%', my: 3 }} />
      <Box sx={{ display: 'flex', width: '100%', gap: 4 }}>
      <Card sx={{ width: '50%', p: 2, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
          Hosted Events
        </Typography>
        {events.map((event) => (
          <Button
            key={event.id}
            onClick={() => handleEventClick(event)}
            sx={{
              justifyContent: 'space-between',
              textAlign: 'left',
              mb: 2,
              p: 2,
              backgroundColor: '#f5f5f5',
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            }}
          >
            <div>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {event.title}
              </Typography>
            </div>
          </Button>
        ))}
      </Card>
      <Card sx={{ flex: 1, p: 2, boxShadow: 3 }}>
          <Typography variant="h5" gutterBottom>
            Attended Events
          </Typography>
        </Card>
      </Box>
      
      <Dialog open={selectedEvent !== null} onClose={handleEventClose}>
        {selectedEvent && (
          <>
            <DialogTitle>{selectedEvent.title}</DialogTitle>
            <DialogContent>
              <Typography variant="body1">{`Description: ${selectedEvent.description}`}</Typography>
              <Typography variant="body2">{`Date: ${selectedEvent.date}, `}</Typography>
              <Typography variant="body2">{`Time: ${selectedEvent.time}`}</Typography>
              <Typography variant="body2">{`Virtual Location: ${selectedEvent.virtualLocation}`}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEventClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Profile;
