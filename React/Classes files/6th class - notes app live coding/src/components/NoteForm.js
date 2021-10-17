import { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function NoteForm({ addNote, updateNote, currentNoteInfo, index, handleClose }) {
    const editMode = currentNoteInfo && Object.keys(currentNoteInfo).length > 0 ? true : false
    const emptyNote = {title:'', content:''}
    const [noteValue, setNoteValue] = useState(editMode ? currentNoteInfo : emptyNote)

    const handleTitleChange = (e) => setNoteValue({...noteValue, title:e.target.value})
    const handleContentChange = (e) => setNoteValue({...noteValue, content:e.target.value})
    const handleAddNote = () => {
        if(noteValue.content.length === 0) return
        addNote(noteValue)
        setNoteValue(emptyNote)
    }
    const handleEditNote = () => {
        updateNote(index, noteValue)
        handleClose()
    }
    return (
        <div className="new-note-form">
            
            <TextField
                label="Note Title"
                className="title-filed-input"
                value={noteValue.title}
                onChange={handleTitleChange}
            />
            <TextField
                label="Enter your thoughts here"
                multiline
                required
                fullWidth
                rows={4}
                value={noteValue.content}
                onChange={handleContentChange}
            />
            {!editMode && <Button variant="contained" onClick={handleAddNote}>Add Note</Button>}
            {editMode && <Button variant="contained" onClick={handleEditNote}>Edit Note</Button>}
        </div>
    )
}
