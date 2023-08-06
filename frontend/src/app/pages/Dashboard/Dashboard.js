import React, { useState, useEffect } from 'react';
import Cards from '../../../../components/Cards/Cards';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useUserContext } from '../../../../context/userContext';
import { Toaster,toast } from 'react-hot-toast';
import EditEventModal from '../../../../components/EditModel/EditEventModel'

const Dashboard = () => {
  const {user,events,fetchVirtualEvents} = useUserContext()
  const [data,setdata] = useState({
   user:""
  })
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);


  const handleModalClose = () => {
    setEditModalOpen(false);
    setSelectedEvent(null);
  };

  const handleEventUpdate = async (updatedEvent) => {
    try {
      await handleEdit(updatedEvent._id, updatedEvent);
      fetchVirtualEvents();
      toast.success('Event updated successfully');
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error('Error updating event');
    }
  };


  const [filterCriteria, setFilterCriteria] = useState({
    category: '',
    date: '',
    virtualLocation: '',
  });
 
  useEffect(() => {
    fetchVirtualEvents();
  }, []);


  const handleFilterChange = (name, value) => {
    setFilterCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilterCriteria({
      category: '',
      date: '',
      virtualLocation: '',
    });
  };

  const filteredEvents = events?.filter((event) => {
    const category = event.title?.toLowerCase() || '';
    const date = event.date || '';
    const location = event.virtualLocation?.toLowerCase() || '';

    return (
      category.includes(filterCriteria.category.toLowerCase()) &&
      date.includes(filterCriteria.date) &&
      location.includes(filterCriteria.virtualLocation.toLowerCase())
    );
  }) ?? [];

  return (
    <div className="p-4 background-color:white  ">
      <h1 className="text-3xl font-semibold mb-6">Upcoming Events</h1>
      <div className="flex flex-wrap gap-4 mb-4">
        <TextField
          label="Category"
          variant="outlined"
          size="small"
          value={filterCriteria.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="w-60"
        />
        <TextField
          variant="outlined"
          size="small"
          type="date"
          value={filterCriteria.date}
          onChange={(e) => handleFilterChange('date', e.target.value)}
          className="w-60"
        />
        <TextField
          label="Location"
          variant="outlined"
          size="small"
          value={filterCriteria.virtualLocation}
          onChange={(e) => handleFilterChange('virtualLocation', e.target.value)}
          className="w-60"
        />
        <Button variant="contained" style={{backgroundColor: 'blue', color: 'white'}} onClick={handleResetFilters}  color="primary" >
          Reset Filters
        </Button>
      </div>
      <Grid style={{marginTop:'2rem',}} container spacing={2}>
        {filteredEvents.map((event) => (
          <Grid key={event._id} item xs={12} sm={6} md={4} lg={3} >
            <Cards
              event={event}
              key={event._id}
              // onAttend={ handleAttend}
              // onRSVP={handleRSVP}
            />
          </Grid>
        ))}
      </Grid>
      <EditEventModal
        event={selectedEvent}
        isOpen={editModalOpen}
        onClose={handleModalClose}
        onUpdate={handleEventUpdate}
      />
      <Toaster
            position="top-center"
            reverseOrder={false}
          />
    </div>
  );
};

export default Dashboard;