import React from 'react';
import Note from "./Note";

function NoteList ({ notes, deleteNote, editNote, archivedNote }) {

    return ( 
        <div style={{display: 'grid', gridTemplateColumns:'repeat(3, 1fr)'}}>
          {notes.length === 0 ? null : notes.map((note) => <Note notes={note} key={note.id} deleteNote={deleteNote} editNote={editNote} archivedNote={archivedNote}/>)}
      </div>
     );
}
 
export default NoteList;