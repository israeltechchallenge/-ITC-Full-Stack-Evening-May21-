import React from 'react';
import Note from "./Note";

function NoteList ({ notes, deleteNote, editNote }) {
    console.log(notes)
    return ( 
        <div style={{display: 'grid', gridTemplateColumns:'repeat(3, 1fr)'}}>
          {/* {notes.map((note, index) => <Note notes={note} key={notes.id} index={index} deleteNote={deleteNote} editNote={editNote} />)} */}
      </div>
     );
}
 
export default NoteList;