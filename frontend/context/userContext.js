'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import updateEvent from '../api/apiServices'
import attendEvent from '../api/apiEvent';

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}


export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [id,setId] = useState('');
  const [events, setEvents] = useState([]);


  
  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    if (storedId) {
      setId(JSON.parse(storedId));
    }
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedEvents = localStorage.getItem('events');
    if(storedEvents){
      setEvents(JSON.parse(storedEvents))
    }
  }, []);

  const editEvents = async (id,event_id, updatedEvent) => {
    try {
      const response = await updateEvent(id,event_id, updatedEvent);
      return response;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  };
  const attendEvents = async (eventId, userId) => {
    try {
      const response = await attendEvent(eventId, userId);
      console.log(response);
      return response;
    } catch (error) {
      console.error('Error attending event:', error);
      throw error;
    }
  };
  const userSave = (id) => {
    setId(id);
    localStorage.setItem('userId', JSON.stringify(id));
    console.log(id)
  };
  const storeUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    console.log(userData);
  };
  const eventsSave = (eventsData) => {
    setEvents(eventsData);
    localStorage.setItem('events',JSON.stringify(eventsData));
  }
  const fetchVirtualEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/getAllEvents');
      const data = await response.json();
      eventsSave(data.data); 
    } catch (error) {
      console.error('Error fetching virtual events:', error);
    }
  }
  

  const addEvent = (event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };


  const logoutUser = () => {
    userSave(null);
    storeUser(null)

  };

  return (
    <UserContext.Provider value={{ eventsSave, editEvents,attendEvents, user,  events, addEvent, logoutUser,fetchVirtualEvents,id,storeUser, userSave }}>
      {children}
    </UserContext.Provider>
  );
}