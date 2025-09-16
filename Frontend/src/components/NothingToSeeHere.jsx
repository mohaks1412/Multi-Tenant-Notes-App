import React from "react";
import "./NothingToSeeHere.css";

const NothingToSeeHere = () => {
  return (
    <div className="nothing-container">
      <div className="eyes">
        <div className="eye">
          <div className="pupil"></div>
        </div>
        <div className="eye">
          <div className="pupil"></div>
        </div>
      </div>
      <p className="message">Nothing to see here...</p>
    </div>
  );
};

export default NothingToSeeHere;
