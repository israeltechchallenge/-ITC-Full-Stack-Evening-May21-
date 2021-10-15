import React from 'react'
import { useState } from 'react'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import DeleteIcon from '@mui/icons-material/Delete'

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import  Button  from '@mui/material/Button';
export default function DeleteModal({ archiveNote, restoreNote, index, archived }) {
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleConfirm = () => {
        if(archived)
            restoreNote(index)
        else 
            archiveNote(index)
    }
    return (
        <div>
            <div onClick={handleClickOpen} >
                {archived ? <AutorenewIcon /> : <DeleteIcon />}
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                   {archived ? 'Restore' : 'Archive'} Notice!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to {archived ? 'restore' : 'archive'} this Note?
                   </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleConfirm} autoFocus>Yes, I'm sure</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

