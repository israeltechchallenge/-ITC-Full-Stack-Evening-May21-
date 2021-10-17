import React from "react";

const AchivedNote = ({note}) => {
  return (
    <li className="note">
      <div className="notes-title">
        <p>{note.title}</p>
      </div>
      <div className="notes-noteContent">
        <p>{note.contentNote}</p>
      </div>
    </li>
  );
};

export default AchivedNote;
