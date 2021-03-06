import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import dateToIsoStringWithTZ from '../utilities/dateToIsoStringWithTZ'

function NoteForm({ onAdd, onUpdate, existingNote }) { //YS Nice component! 

    const [noteInputs, setNoteInputs] = useState(existingNote ?
        { title: existingNote.title, text: existingNote.text, reminder: (existingNote.reminder ? dateToIsoStringWithTZ(existingNote.reminder) : '') }
        :
        { title: '', text: '', reminder: '' }); //YS: This ternary is a little messy, convert your values into variables/functions and have a simple ternary. 
    const [reminderChanged, setReminderChanged] = useState(false);

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

    const handleNoteReminder = (e) => {
        setNoteInputs({ ...noteInputs, reminder: e.target.value });
        setReminderChanged(true);
    }

    const handleNote = (e) => {
        e.preventDefault();
        const noteId = (existingNote) ? existingNote.id : uuidv4();
        const noteCreatedAt = (existingNote) ? existingNote.createdAt : new Date();
        const noteUpdatedAt = (existingNote) ? ((reminderChanged) ? existingNote.updatedAt : new Date()) : null;
        const note = { title: noteInputs.title, text: noteInputs.text, reminder: (noteInputs.reminder ? new Date(noteInputs.reminder) : null), createdAt: noteCreatedAt, updatedAt: noteUpdatedAt, id: noteId }
        if (existingNote) onUpdate(note); //YS: Nice
        else onAdd(note);
        setNoteInputs({ title: '', text: '', reminder: '' });
        const titleLegend = document.querySelector('.legend-title');
        const textLegend = document.querySelector('.legend-text');
        titleLegend.style.display = 'none';
        textLegend.style.display = 'none';
        ;
    }

    const adjustTextareaHeight = () => {
        const textarea = document.querySelector('.input-text');
        textarea.style.height = "auto";
        textarea.style.height = (textarea.scrollHeight) + "px";
    }

    const hideShowLegend = (input) => input.previousElementSibling.style.display = (input.value) ? "unset" : "none";

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