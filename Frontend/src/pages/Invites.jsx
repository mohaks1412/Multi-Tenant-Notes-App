import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/Loading";
import InviteCard from "../components/InvitationCard";
import InviteFormModal from "../components/InviteFormModal"; // 👈 new
import './Invites.css'
import NothingToSeeHere from "../components/NothingToSeeHere";
import axios from "axios";

const InvitesPage = () => {
  const user = useSelector((state) => state.user);
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/invites`, {
          withCredentials: true, // same as credentials: "include"
        });
        
        const data = await res.data;
        setInvites(data);
        
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvites();
  }, []);

  const handleInviteCreated = (newInvite) => {
    setInvites((prev) => [...prev, newInvite]);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="invites-page-container">
      <h1 className="page-title">Team Invites</h1>

      {/* Admin-only "+" button */}
      {user?.role === "admin" && (
        <button
          onClick={() => setShowModal(true)}
          className="fab"
        >
          +
        </button>
      )}

      {/* Invites list */}
      {invites.length === 0 ? (
          <NothingToSeeHere />
      ) : (
        <div className="invites-grid">
          {invites.map((invite) => (
            <InviteCard key={invite._id} invite={invite} />
          ))}
        </div>
      )}

      {/* Modal for creating new invite */}
      {showModal && (
        <InviteFormModal
          onClose={() => setShowModal(false)}
          onCreated={handleInviteCreated}
        />
      )}
    </div>
  );
};

export default InvitesPage;