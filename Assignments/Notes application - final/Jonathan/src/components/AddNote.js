import React, { useState } from 'react'

import Form from './Form'

const AddNote = ({ handleAddNotes }) => {

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

    function handleAddNote(e) {
        e.preventDefault();
        if (state.body.trim().length > 0) {
            handleAddNotes(state.body, state.title)
            setState({ body: '', title: '' })
        } else {
            setState({ body: '', title: '' })
        }
    }


    return (
        <Form
            handleSumbit={(e) => handleAddNote(e)}
            handleData={state}
            handleChangeBody={handleChange}
            handleChangeTitle={handleChange}
            buttonLabel="Add Notes"
        />
    )

}

export default AddNote
