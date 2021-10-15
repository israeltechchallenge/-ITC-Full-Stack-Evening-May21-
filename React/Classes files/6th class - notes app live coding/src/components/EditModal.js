import { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import NoteForm from './NoteForm'
export default function EditModal({note, index, updateNote }) {
        const [open, setOpen] = useState(false)
        const handleClickOpen = () => setOpen(true)
        const handleClose = () => setOpen(false)
    return (
        <div>
            <EditIcon onClick={handleClickOpen} />
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
            >
                <DialogTitle>
                    Update Note
                </DialogTitle>
                <DialogContent>
                    <NoteForm currentNoteInfo={note} {...{index, updateNote, handleClose}} />
                </DialogContent>
            </Dialog>
        </div>
    )
}
