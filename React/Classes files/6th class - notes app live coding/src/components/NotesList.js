import React from 'react'
import Note from './Note'
export default function NotesList({ notes, updateNote, archiveNote, restoreNote, archived }) {
    return (
        <div className={'notes-list'}>
            {notes && notes.map((note, index) => <Note key={note.id}  {...{note, index, updateNote, archiveNote, restoreNote, archived }}/>)}
        </div>
    )
}
