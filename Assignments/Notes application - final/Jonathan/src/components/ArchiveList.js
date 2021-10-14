
import ArchiveNotes from './ArchiveNotes'

const ArchiveList = ({ archivenotes,handleRestoreNote }) => {
    return (
        <div className="notes-list mt-5">
            {archivenotes.map(archivenote => <ArchiveNotes archivenote={archivenote} key={archivenote.id} 
                                                handleRestoreNote={handleRestoreNote} />)}
        </div>
    )
}

export default ArchiveList;