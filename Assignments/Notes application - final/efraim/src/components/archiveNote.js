import DisplayNote from './DisplayNote'
function ArchiveNote({ note, index, restoreNote }) {
    
    return <div className="note">
    <DisplayNote note={note} />
    <button onClick={() => restoreNote(note, index)}>Restore</button>
    </div>
    }
    export default ArchiveNote