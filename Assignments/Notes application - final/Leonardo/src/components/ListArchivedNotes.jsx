import React from 'react';
import NoteArchive from './NoteArchive';

const ListArchivedNotes = ({archiveNotes, restoreNote}) => {
    return ( 
        <div className='task__wrapper'>
      {archiveNotes.map(note => (
        <NoteArchive
          key={note.key}
          note={note}
          restoreNote={restoreNote}
        />
      ))}
    </div>
     );
}
 
export default ListArchivedNotes;