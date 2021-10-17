import formatDate from '../utilities/fromatDate';

function Note( { title, createdAt, updatedAt, text, onToggleArchive, onOpenModal, isArchived, hasReminder, index }) {
    const relative = true;
    const createdFormattedDate = formatDate(createdAt, false, relative);
    const updatedFormattedDate = (updatedAt) ? formatDate(updatedAt, false, relative) : null;
    const createdClass = (updatedAt) ? 'date' : 'title';
    const archiveTopClass = (isArchived) ? ' note__item--archived' : '';

    return (
        <div className='note tilt-in-fwd-br' onClick={(e) => onOpenModal(e.target, index, isArchived)}>
            <span className={`note__item note__item--close${archiveTopClass}`} onClick={() => onToggleArchive(index, isArchived)}><i className={`fas fa-trash${isArchived ? '-restore' : ''}`}></i></span>
            {title ?
            <div className={`note__item note__item--top${archiveTopClass}`}>
                <h4 className='note__item note__item--title'>{title}</h4>
                {updatedAt ?
                <p className='note__item note__item--date'>updated{relative ? ' ' : `:${<br />}`}{updatedFormattedDate}</p> : null}
                <p className='note__item note__item--date'>created{relative ? ' ' : `:${<br />}`}{createdFormattedDate}</p>
            </div>
            :
            <div className={`note__item note__item--top${archiveTopClass}`}>
                {updatedAt ?
                <p className='note__item note__item--title'>updated{relative ? ' ' : `:${<br />}`}{updatedFormattedDate}</p> : null}
                <p className={`note__item note__item--${createdClass}`}>created{relative ? ' ' : `:${<br />}`}{createdFormattedDate}</p>
            </div>
            }
            <p className='note__item note__item--text'>{text}</p>
            <span className="note__item note__item--reminder">{(hasReminder && (!isArchived)) ? <i className="fas fa-bell"></i> : ''}</span>
        </div>
    );
}

export default Note;