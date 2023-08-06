import axios from 'axios';

export default async function attendEvent(eventId, userId) {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/attend/${eventId}/${userId}`
      );
  
      return response.data;
    } catch (error) {
      console.error('Error attending event:', error);
      throw error;
    }
  }