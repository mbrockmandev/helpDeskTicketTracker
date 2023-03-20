import axios from 'axios';

const API_URL = '/api/tickets/';

const getNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + ticketId + '/notes', config);

  return response.data;
};

const addNote = async (ticketId, noteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + ticketId + '/notes',
    { text: noteData },
    config,
  );

  return response.data;
};

const noteService = {
  getNotes,
  addNote,
};

export default noteService;
