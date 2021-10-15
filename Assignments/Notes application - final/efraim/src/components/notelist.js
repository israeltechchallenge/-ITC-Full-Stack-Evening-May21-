import Note from './note'
function NoteList ({ notes, deleteNote, editNote }) {
        return <div className="flex">
            {notes && notes.map((note, index) => <Note note={note} key={note.id} index={index} deleteNote={deleteNote} editNote={editNote} />)}
        </div>
}
export default NoteList