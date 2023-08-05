import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CardMedia, CardActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const Cards = ({ event, onAttend, onRSVP }) => {
  const handleAttendClick = () => {
    console.log(event)
    onAttend(event);
  };

  const handleEdit = (Id) => {
    
  }

  const handleRSVPClick = () => {
    onRSVP(event._id);
  };

  return (

    <Card sx={{ maxWidth: 400 }}>
      {/* <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {event.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {event.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Date : {event.date} 
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Time : {event.time}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        VirtualLocation : {event.virtualLocation}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <EditIcon onClick={handleEdit(event._id)} />
        </Typography>
      </CardContent>
      <CardActions>
      {event.isParticipated ? (
            event.isRSVPed ? (
              <Typography variant="body2" className="text-green-500 font-bold">
                You have RSVPed to this event.
              </Typography>
            ) : (
              <Button variant="contained" color="secondary" style={{backgroundColor: 'blue', color: 'white'}} onClick={handleRSVPClick} className="px-4 py-2">
                RSVP
              </Button>
            )
          ) : (
            <Button variant="contained" style={{backgroundColor: 'blue', color: 'white'}} onClick={handleAttendClick} className="px-4 py-2">
              Attend
            </Button>
          )}
      </CardActions>
         
    </Card>
  );
};

export default Cards;