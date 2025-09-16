import { useEffect, useState } from "react";
import notesService from "../services/notesService";
import Input from "./Input";
import NotesCard from "./NotesCard";
import "./NotesList.css";

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [search, setSearch] = useState("");

    const handleDeleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note._id !== id));
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await notesService.getAllNotes();
      console.log(data);
      
      setNotes(data.notes || []);
      setFilteredNotes(data.notes || []); // initial
    };
    fetchNotes();
  }, []);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    setFilteredNotes(
      notes.filter(
        (note) =>
          (note.title || "").toLowerCase().includes(lowerSearch) ||
          (note.content || "").toLowerCase().includes(lowerSearch)
      )
    );
  }, [search, notes]);

  return (
    <div className="notes-list-container">
      <Input
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="notes-grid">
        {filteredNotes.map((note) => (
          <NotesCard key={note._id} _id={note._id} note={note.content} title={note.title} createdBy={note.createdBy} onDelete={handleDeleteNote} />
        ))}
      </div>
    </div>
  );
};

export default NotesList;
