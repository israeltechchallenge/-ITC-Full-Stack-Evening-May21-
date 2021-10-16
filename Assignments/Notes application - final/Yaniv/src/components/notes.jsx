import Note from './note';

function Notes({ notes, isArchived, confirmToggle, openModal }) {
    return (
        <section>
          <div className="notes">
            {notes.length ?
            notes.map((note, index) =>
              <Note
                key={note.id}
                index={index}
                onToggleArchive={confirmToggle}
                isArchived={isArchived}
                hasReminder={note.reminder}
                onOpenModal={openModal}
                title={note.title}
                createdAt={note.createdAt}
                updatedAt={note.updatedAt}
                text={note.text}
                id={note.id} />) :
            <p className="text-bg">No {(isArchived) ? ' archived' : 'active'} notes</p>}
          </div>
          <h2 className="notes-title text-bg">Active Notes</h2>
        </section>
    )
}

export default Notes;