import { BiArchiveOut } from 'react-icons/bi'


const ArchiveNotes = ({ archivenote, handleRestoreNote }) => {
    const { id, title, text, createdate, updatedate } = archivenote
    return (
        <div className="note">
            <h2>{(title.length > 0) ? `Title: ${title}` : ''}</h2>
            <span className="mt-3">{text}</span>
            <div className="note-footer mt-4">
                <div className="d-flex flex-column">
                    <small>Created: {createdate}</small>
                    {updatedate === null ? null : <small>Updated: {updatedate}</small>}
                </div>
            </div>
            <BiArchiveOut color = "#3B5998" className="icon archiveout" size='1.3em' onClick={() => {
                (window.confirm('Are you sure you want to restore this note')) ?
                    handleRestoreNote(id) : alert('Restore Cancelled')
            }} />
        </div>
    )
}

export default ArchiveNotes