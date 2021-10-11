import React from 'react'
import Note from './note'
function NoteList ({ notes, deleteNote, editNote }) {
        return <div className="flex">
            {notes.map((note, index) => <Note note={note} key={note.id} index={index} deleteNote={deleteNote} editNote={editNote} />)}
        </div>
}
export default NoteList