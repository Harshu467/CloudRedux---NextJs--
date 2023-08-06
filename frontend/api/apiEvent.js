import axios from 'axios';

export default async function attendEvent(eventId, userId) {
    try {
      const response = await axios.put(
        `${process.env.BASE_URL}/attend/${eventId}/${userId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error attending event:', error);
      throw error;
    }
  }