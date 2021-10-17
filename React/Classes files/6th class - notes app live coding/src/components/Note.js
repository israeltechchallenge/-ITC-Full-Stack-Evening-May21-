import React from 'react'
import Box from '@mui/material/Box'
import moment from 'moment';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
    width: '150px',
    height: '150px',
  };
export default function Note({ note, index, updateNote, archiveNote, restoreNote, archived }) {
    return (
        <Box sx={{...commonStyles, borderRadius: '16px',overflow:'hidden', textOverflow:'ellipsis', padding:'4px' }}>
            <div className="note-container">
                <div className="note-header">
                    <div className="note-title">
                        {note.title}
                    </div>
                <div className="note-operations">
                    <EditModal {...{note, index, updateNote }} />
                    <DeleteModal {...{archiveNote, restoreNote, index, archived }} />
                </div>
                </div>
                <div className="note-content">
                    {note.content}
                </div>
                <div className="note-dates">
                    Added {moment(note.createdDate).fromNow()} <br />
                    {note.updatedDate && `Updated ${moment(note.updatedDate).fromNow()}`}
                </div>
            </div>
        </Box>
    )
}
