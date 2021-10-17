import React, { useState } from 'react'

import Form from './Form'

const AddNote = ({ handleAddNotes }) => {

    const [value, setDatePicker] = useState(new Date());

    const [state, setState] = useState({  //YS: Dont call your state "state"! Call it "noteText" "note" or something.
        body: '',
        title: ''
    })

    

    function handleChange(e){
        const value = e.target.value //YS: Dont call your value VALUE!!
        setState({
            ...state,
            [e.target.name]:value //YS: Very nice! 
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
