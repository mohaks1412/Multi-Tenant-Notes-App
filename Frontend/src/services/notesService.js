// src/services/notesService.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const notesService = {
  // GET /notes - list all notes for current tenant
  getAllNotes: async () => {
    const res = await axios.get(`${API_URL}/notes`, { withCredentials: true });
    return res.data;
  },

  // GET /notes/:id - get a specific note
  getNoteById: async (id) => {
    const res = await axios.get(`${API_URL}/notes/${id}`, { withCredentials: true });
    return res.data;
  },

  // POST /notes - create a new note
  createNote: async (noteData) => {
    const res = await axios.post(`${API_URL}/notes`, noteData, { withCredentials: true });
    return res.data;
  },

  // PUT /notes/:id - update a note
  updateNote: async (id, noteData) => {
    const res = await axios.put(`${API_URL}/notes/${id}`, noteData, { withCredentials: true });
    return res.data;
  },

  // DELETE /notes/:id - delete a note
  deleteNote: async (id) => {
    const res = await axios.delete(`${API_URL}/notes/${id}`, { withCredentials: true });
    return res.data;
  },
};

export default notesService;
