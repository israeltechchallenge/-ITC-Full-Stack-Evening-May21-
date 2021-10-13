import React, { useState } from 'react'

import Form from './Form'

const AddNote = ({ handleAddNotes }) => {

    const [value, setDatePicker] = useState(new Date());

    const [state, setState] = useState({
        body: '',
        title: ''
    })

    

    function handleChange(e){
        const value = e.target.value
        setState({
            ...state,
            [e.target.name]:value
        })
    }

    function handleChangeDate(e){
        setDatePicker(e)
    }


    function handleAddNote(e) {
        e.preventDefault();
        if (state.body.trim().length > 0) {
            handleAddNotes(state.body, state.title, value)
            setState({ body: '', title: '', datereminder: new Date()})
        } else {
            setState({ body: '', title: '', datereminder: new Date()})
        }
    }


    return (
        <Form
            handleSumbit={(e) => handleAddNote(e)}
            handleData={state}
            handleDate ={value}
            handleChangeBody={handleChange}
            handleChangeTitle={handleChange}
            handleChangeDate = {handleChangeDate}
            buttonLabel="Add Notes"
        />
    )

}

export default AddNote
