import React from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import notesService from "../services/notesService";
import "./NotesCard.css";

const NotesCard = ({ title, createdBy, _id, onDelete }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/notes/${_id}`); // go to detail page
  };

  const handleDelete = async (e) => {
    e.stopPropagation(); // prevent triggering handleClick
    e.preventDefault();  // also stop default navigation
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await notesService.deleteNote(_id);
        if (onDelete) onDelete(_id); // notify parent to refresh notes
      } catch (err) {
        console.error("Failed to delete note:", err);
      }
    }
  };

  return (
    <div className="note-card" onClick={handleClick}>
      <h2>{title}</h2>
      <h4>Author: {createdBy}</h4>
      <button className="delete-btn" onClick={handleDelete}>
        <Trash2
          className="delete-icon"
          size={20}
          onClick={handleDelete}
        />
      </button>
    </div>
  );
};

export default NotesCard;