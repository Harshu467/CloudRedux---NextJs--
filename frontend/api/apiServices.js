import axios from "axios";

export default async function updateEvent(userId, eventId, eventData) {
  try {
    const response = await axios.put(
      `${process.env.BASE_URL}/eventsUpdate/${userId}/${eventId}`,
      eventData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

