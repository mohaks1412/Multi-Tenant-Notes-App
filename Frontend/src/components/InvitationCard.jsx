import React from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react"; // icons
import "./InvitationCard.css"; // styles

const InvitationCard = ({ invite }) => {
  const { email, role, status, invitedBy } = invite;

  // Status icon
  const statusIcon = {
    pending: <Clock className="status-icon pending" />,
    accepted: <CheckCircle className="status-icon accepted" />,
    rejected: <XCircle className="status-icon rejected" />,
  }[status];

  return (
    <div className="invite-card">
      <div className="invite-header">
        <h3 className="invite-email">{email}</h3>
        <span className={`invite-status ${status}`}>{statusIcon} {status}</span>
      </div>

      <p className="invite-role">Role: <strong>{role}</strong></p>
      <p className="invite-by">Invited by: {invitedBy?.name || "Admin"}</p>
    </div>
  );
};

export default InvitationCard;