import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function NoteForm(props) {

    const [title, setTitle] = useState(props.title);
    const [text, setText] = useState(props.text);

    useEffect(() => {
        adjustTextareaHeight();
    });

    const handleNoteTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleNoteText = (e) => {
        setText(e.target.value);
        adjustTextareaHeight();
    }

    const handleNote = (e) => {
        e.preventDefault();
        const noteId = (props.id) ? props.id : uuidv4();
        const noteCreatedAt = (props.createdAt) ? props.createdAt : new Date();
        const noteUpdatedAt = (props.createdAt) ? new Date() : null;
        const note = { title, text, createdAt: noteCreatedAt, updatedAt: noteUpdatedAt, id: noteId }
        if (props.id) props.onUpdate(note);
        else props.onAdd(note);
        setTitle('');
        setText('');
    }

    const adjustTextareaHeight = () => {
        const textarea = document.querySelector('.note-form__item--text');
        textarea.style.height = "auto";
        textarea.style.height = (textarea.scrollHeight) + "px";
    }

    return (
        <form onSubmit={(e) => {handleNote(e)}}  className='note-form'>
            <input placeholder='Note Title (max 25 chars)' value={title} onChange={handleNoteTitle} maxLength={25} className='note-form__item note-form__item--title'/>
            <textarea placeholder='Note text (max 250 chars)' value={text} onChange={handleNoteText} maxLength={250} className='note-form__item note-form__item--text' required>
                
            </textarea>
            <input type='submit' value='Done' className='note-form__item note-form__item--submit' />
        </form>
    );
}

export default NoteForm;