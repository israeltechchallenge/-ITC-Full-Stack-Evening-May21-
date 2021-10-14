import React from 'react'
import Notes from './Notes'

const NoteList = ({ notes, handleDeleteNote, editNotes, handleArchiveNote }) => {
    return (
        <div className="notes-list mt-5">
            {notes.map((note) => (
                <Notes note={note} handleDeleteNote={handleDeleteNote} key={note.id} editNotes={editNotes}
                    handleArchiveNote={handleArchiveNote} />
            ))}
        </div>
    )
}

export default NoteList
