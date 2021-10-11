function ArchiveNote({ archivedNote, index, restoreNote }) {
    
    return <div className="note">
    <h2>{archivedNote.title}</h2>
    <h3>{archivedNote.readbleDate}</h3>
    <p>{archivedNote.note}</p>
    <button onClick={() => restoreNote(archivedNote, index)}>Restore</button>
    
</div>
    }
    export default ArchiveNote