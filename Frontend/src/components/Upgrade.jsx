import React from "react";
import Button from "./Button";
import "./Upgrade.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Upgrade = ({ onUpgrade, onClose }) => {
  const role = useSelector(state => state.user.role);
    const navigate = useNavigate();
    if(!onClose){
        onClose = ()=>{
            navigate('/notes')
        }
    }
  return (
    <div className="upgrade-page-container">
      <div className="upgrade-card">
        <h1 className="upgrade-title">
          You're on the Free Plan
        </h1>
        <p className="upgrade-description">
          Currently, you can create <strong>3 notes</strong>. Upgrade to Pro to unlock <strong>unlimited notes</strong> and get the most out of your workspace.
        </p>

        <div className="pro-plan-box">
          <h2 className="pro-plan-title">Pro Plan</h2>
          <p className="pro-plan-features">Unlimited notes, priority support, and full features</p>
        </div>

        <div className="upgrade-buttons">
          {role==='admin' && <Button onClick={onUpgrade}>
            Upgrade Now!
          </Button>}
          <Button onClick={onClose}>
            Later
          </Button>
        </div>

        <p className="upgrade-note">
          No worries, your notes will remain safe after upgrade.
        </p>
      </div>
    </div>
  );
};

export default Upgrade;
