import ArchivedNote from './archiveNote'
function ArchiveNoteList ({ archivedNotes, restoreNote }) {
        return <div className="flex">
            {archivedNotes && archivedNotes.map((archivedNote, index) => <ArchivedNote archivedNote={archivedNote} key={archivedNote.id} index={index} restoreNote={restoreNote} />)}
        </div>
}
export default ArchiveNoteList