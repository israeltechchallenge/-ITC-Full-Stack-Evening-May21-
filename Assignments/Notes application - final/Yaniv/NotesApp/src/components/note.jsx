import formatDate from '../utilities/fromatDate';

function Note( { title, createdAt, updatedAt, text, onToggleArchive, isArchived, onOpenModal, index }) {
    const createdFormattedDate = formatDate(createdAt, false);
    const updatedFormattedDate = (updatedAt) ? formatDate(updatedAt, false) : null;
    const createdClass = (updatedAt) ? 'date' : 'title';
    const archiveTopClass = (isArchived) ? ' note__item--archived' : ''
    return (
        <div className='note tilt-in-fwd-br' onClick={(e) => onOpenModal(e, index, isArchived)}>
            {<span className={`note__item note__item--close${archiveTopClass}`} onClick={() => onToggleArchive(index, isArchived)}>{isArchived ? '⭯' : '✖'}</span>}
            {title ?
            <div className={`note__item note__item--top${archiveTopClass}`}>
                <h4 className='note__item note__item--title'>{title}</h4>
                {updatedAt ?
                <p className='note__item note__item--date'>updated:<br />{updatedFormattedDate}</p> : null}
                <p className='note__item note__item--date'>created:<br />{createdFormattedDate}</p>
            </div>
            :
            <div className={`note__item note__item--top${archiveTopClass}`}>
                {updatedAt ?
                <p className='note__item note__item--title'>updated:<br />{updatedFormattedDate}</p> : null}
                <p className={`note__item note__item--${createdClass}`}>created:<br />{createdFormattedDate}</p>
            </div>
            }
                <p className='note__item note__item--text'>{text}</p>
        </div>
    );
}

export default Note;