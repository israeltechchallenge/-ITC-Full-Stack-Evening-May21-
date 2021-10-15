import Note from './Note'
function NoteList ({ notes, deleteNote, editNote, restoreNote  }) {
        return <div className="flex">
            {deleteNote && notes.map((note, index) => <Note note={note} key={note.id} index={index} deleteNote={deleteNote} editNote={editNote} />)}
            
            {restoreNote && notes.map((archivedNote, index) => <Note note={archivedNote} key={archivedNote.id} index={index} restoreNote={restoreNote} />)}
        </div>
}
export default NoteList