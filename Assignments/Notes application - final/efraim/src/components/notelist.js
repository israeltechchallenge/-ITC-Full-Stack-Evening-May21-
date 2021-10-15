import Note from './Note'
function NoteList (props) {
        return <div className="flex">
            {props.deleteNote && props.notes.map((note, index) => <Note note={note} key={note.id} index={index} deleteNote={props.deleteNote} editNote={props.editNote} />)}
            {props.restoreNote && props.notes.map((archivedNote, index) => <Note note={archivedNote} key={archivedNote.id} index={index} restoreNote={props.restoreNote} />)}
        </div>
}
export default NoteList