import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import { Edit3 } from "lucide-react";
import notesService from "../services/notesService";
import styles from "./NoteDetail.module.css";

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      const data = await notesService.getNoteById(id);
      setNote(data);
    };
    fetchNote();
  }, [id]);

  const handleSave = async () => {
    try {
      await notesService.updateNote(id, { title: note.title, content: note.content });
      setEditing(false);
    } catch (err) {
      console.error("Failed to update note:", err);
    }
  };

  if (!note) return <p className={styles.loadingMessage}>Loading...</p>;

  return (
    <div className={styles.noteDetailContainer}>
      <h1 className={styles.noteTitle}>{note.title}</h1>

      <Input
        multiline
        value={note.content}
        readOnly={!editing}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
        style={{ minHeight: "50vh", padding: "1rem" }}
      />

      {editing ? (
        <div className={styles.buttonGroup}>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={() => setEditing(false)}>Cancel</Button>
        </div>
      ) : (
        <div className={styles.editIcon} onClick={() => setEditing(true)}>
          <Edit3 size={24} color="#20c997" />
        </div>
      )}

      <Button onClick={() => navigate("/notes")}>
        Back
      </Button>
    </div>
  );
};

export default NoteDetail;
