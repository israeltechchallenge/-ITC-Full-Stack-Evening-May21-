import React from 'react'
import Notes from './Notes'

const NoteList = ({ notes, handleDeleteNote,editNotes }) => {
    return (
        <div className="notes-list mt-5">
            {notes.map((note) => (
                <Notes note={note} handleDeleteNote={handleDeleteNote} key={note.id} editNotes={editNotes} />
            ))}
        </div>
    )
}

export default NoteList
