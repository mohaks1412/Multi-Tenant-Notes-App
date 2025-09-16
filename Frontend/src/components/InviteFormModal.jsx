import React, { useState } from "react";
import "./InviteFormModal.css";
import axios from "axios";

const InviteFormModal = ({ onClose, onCreated }) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member"); // default role
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${API_URL}/invites`,
        { email, role },
        { withCredentials: true }
      );

      onCreated(res.data);
      onClose();
    } catch (err) {
      console.error("Invite error:", err);
      setError(err.response?.data?.error || "Failed to send invite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Send Invite</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="invite-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-input"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn-cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? "Sending..." : "Send Invite"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteFormModal;