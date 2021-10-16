import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function NoteForm({ onAdd, onUpdate, existingNote }) {

    const [noteInputs, setNoteInputs] = useState(existingNote ?
        { title: existingNote.title, text: existingNote.text, reminder: existingNote.reminder }
        :
        { title: '', text: '', reminder: '' });

    useEffect(() => {
        adjustTextareaHeight();
    });

    const handleNoteTitle = (e) => {
        setNoteInputs({ ...noteInputs, title: e.target.value });
        hideShowLegend(e.target);
    }

    const handleNoteText = (e) => {
        setNoteInputs({ ...noteInputs, text: e.target.value });
        hideShowLegend(e.target);
        adjustTextareaHeight();
    }

    const handleNoteReminder = (e) => setNoteInputs({ ...noteInputs, reminder: e.target.value });

    const handleNote = (e) => {
        e.preventDefault();
        const noteId = (existingNote) ? existingNote.id : uuidv4();
        const noteCreatedAt = (existingNote) ? existingNote.createdAt : new Date();
        const noteUpdatedAt = (existingNote) ? new Date() : null;
        const note = { title: noteInputs.title, text: noteInputs.text, reminder: noteInputs.reminder, createdAt: noteCreatedAt, updatedAt: noteUpdatedAt, id: noteId }
        if (existingNote) onUpdate(note);
        else onAdd(note);
        setNoteInputs({ title: '', text: '', reminder: '' });
    }

    const adjustTextareaHeight = () => {
        const textarea = document.querySelector('.input-text');
        textarea.style.height = "auto";
        textarea.style.height = (textarea.scrollHeight) + "px";
    }

    const hideShowLegend = (input) => input.previousElementSibling.style.display = (input.value) ? "unset" : "none";

    const dateToIsoStringWithTZ = (date) => new Date(date.getTime() - ((new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, 16).replace(' ','T');

    return (
        <form onSubmit={(e) => {handleNote(e)}}  className='note-form'>
            <fieldset className='note-form__item note-form__item--title'>
                <legend className='legend-title'>Note Title</legend>
                <input placeholder='Note Title (max 25 chars)' value={noteInputs.title} onChange={handleNoteTitle} maxLength={25} className='input-title'/>
            </fieldset>
            <fieldset className='note-form__item note-form__item--text'>
                <legend className='legend-text'>Note Text</legend>
                <textarea placeholder='Note Text (max 250 chars)' value={noteInputs.text} onChange={handleNoteText} maxLength={250} className='input-text' required>
                </textarea>
            </fieldset>
            <fieldset className='note-form__item note-form__item--reminder'>
                <label className="label-reminder">Reminder</label>
                <input type="datetime-local" value={noteInputs.reminder} onChange={handleNoteReminder} min={dateToIsoStringWithTZ(new Date())} className='input-reminder' />
            </fieldset>
            <input type='submit' value='Done' className='note-form__item note-form__item--submit' />
        </form>
    );
}

export default NoteForm;