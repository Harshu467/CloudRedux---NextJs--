import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useUserContext } from '../../../../context/userContext';
import Divider from '@mui/material/Divider';
import { Card, Dialog } from '@mui/material';
import Button from '@mui/material';
const Profile = () => {
  const { user,events } = useUserContext();
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

      <Card className="bg-white p-8 shadow-md rounded-lg mb-8">
          <Typography variant="h4" component="h2" gutterBottom>
            Hosted Events
          </Typography>
          {events.map((event) => (
            <Button key={event.id} onClick={() => handleEventClick(event)} className="mb-4">
              <Typography variant="subtitle1">{event.title}</Typography>
              <Typography variant="subtitle2">{event.date}</Typography>
            </Button>
          ))}
        </Card>
        <Dialog open={selectedEvent !== null} onClose={handleEventClose}>
          {selectedEvent && (
            <>
              <DialogTitle>{selectedEvent.title}</DialogTitle>
              <DialogContent>
                <Typography variant="body1">{`Description :${selectedEvent.description}`}</Typography>
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
