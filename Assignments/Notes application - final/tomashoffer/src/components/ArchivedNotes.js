import React from "react";
import { Button } from 'react-bootstrap';

function ArchivedNotes({ archived, unarchiveNote }) {

    function unarchiveActualNote(note){
        unarchiveNote(note)
    }

  return (
    <div>
      <h2 style={{ alignText: "center", margin:'10px'}}>
        Archived Notes
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        {archived.length === 0
          ? null
          : archived.map((note) => (
              <div style={{ border: "1px solid black", margin: "20px" }}>
                <h5 style={{marginTop:'10px'}}>Title: {note.title}</h5>
                <h5>Note: {note.note}</h5>
                <Button 
                variant="warning" 
                style={{margin:'10px'}} 
                onClick={() => unarchiveActualNote(note)}>
                    Unarchive
                </Button>
              </div>
            ))}
      </div>
    </div>
  );
}

export default ArchivedNotes;
