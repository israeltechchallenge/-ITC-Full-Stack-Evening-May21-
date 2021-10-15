import Note from './Note'
import ArchivedNote from './ArchiveNote'
function NoteList (props) {
        return <div className="flex">
            {props.deleteNote && props.notes.map((note, index) => <Note note={note} key={note.id} index={index} deleteNote={props.deleteNote} editNote={props.editNote} />)}
            {props.restoreNote && props.notes.map((archivedNote, index) => <ArchivedNote note={archivedNote} key={archivedNote.id} index={index} restoreNote={props.restoreNote} />)}
        </div>
}
export default NoteList