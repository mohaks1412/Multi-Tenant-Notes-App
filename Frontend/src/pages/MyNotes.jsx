import React, { useEffect, useState } from "react";
import notesService from "../services/notesService";
import NotesCard from "../components/NotesCard";
import Button from "../components/Button"; // Reusable Button component
import axios from "axios";
import { useSelector } from 'react-redux';
import "./MyNotes.css";
import { Link } from "react-router-dom";
import NothingToSeeHere from "../components/NothingToSeeHere";
import LoadingSpinner from "../components/Loading"; // Create a Loading component
import Upgrade from "../components/Upgrade";
import NotesList from "../components/NotesList";

const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [tenant, setTenant] = useState({});
  const [loading, setLoading] = useState(true); // loading state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const user = useSelector(state => state.user);

  const role = user.role;

  

  // Fetch notes + tenant info
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await notesService.getAllNotes(); // returns { notes, tenant }
        setNotes(res.notes);
        setTenant(res.tenant);
      } catch (err) {
        console.error("Failed to fetch notes", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Refresh notes after create/delete
  const fetchNotes = async () => {
    try {
      const res = await notesService.getAllNotes();
      setNotes(res.notes);
    } catch (err) {
      console.error("Failed to fetch notes", err);
    }
  };

  // Delete handler
  const handleDeleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note._id !== id));
  };

  // Handle + button click
  const handleCreateClick = () => {
    if (tenant.plan === "free" && notes.length >= 3) {
      setShowUpgradeModal(true); // show upgrade modal
      return;
    }
    setShowCreateModal(true); // show create note modal
  };

  // Create note
  const createNote = async () => {
    if (!title.trim()) return;
    try {
      await notesService.createNote({ title });
      setTitle("");
      setShowCreateModal(false);
      fetchNotes();
    } catch (err) {
      console.error("Failed to create note", err);
    }
  };

  // Upgrade tenant plan
  const handleUpgrade = async () => {
    if (role === 'member') return;
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/tenants/${tenant.slug}/upgrade`,
        {},
        { withCredentials: true }
      );
      setTenant({ ...tenant, plan: "pro" });
      setShowUpgradeModal(false);
      setShowCreateModal(true);
    } catch (err) {
      console.error("Upgrade failed", err);
    }
  };

  if (loading) return <LoadingSpinner />; // show loading while fetching data

  return (
    <div className="mynotes-container">
      <h1>My Notes</h1>

      {notes.length === 0 ? (
        <NothingToSeeHere />
      ) : (
        
        <div>
          <NotesList/>
        </div>
      )}

      {/* Floating + button */}
      <Button className="fab" onClick={handleCreateClick}>
        +
      </Button>

      {/* Create Note Modal */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create Note</h2>
            <input
              className="modal-input"
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="modal-actions">
              <Button onClick={createNote}>Create</Button>
              <Button onClick={() => setShowCreateModal(false)}>Cancel</Button>
            </div>
          </div>
        </div>
        
      )
      }

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="modal-overlay">
        <Upgrade
          onUpgrade={handleUpgrade}      // Existing upgrade logic
          onClose={() => setShowUpgradeModal(false)} // Closes the overlay
        />
        </div>
      )
      }
    </div>
  );
};

export default MyNotes;
