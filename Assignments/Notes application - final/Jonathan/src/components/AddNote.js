import React from 'react'


import Form from './Form'

class AddNote extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            body: '',
            title: ''
        };
        this.handleChangeTitle = this.handleChangeTitle.bind(this)
        this.handleChangeBody = this.handleChangeBody.bind(this)
    }

    handleChangeTitle(e) {
        this.setState({ title: e.target.value })
    }

    handleChangeBody(e) {
        this.setState({ body: e.target.value })
    }

    handleAddNote(e) {
        e.preventDefault();
        if (this.state.body.trim().length > 0) {
            const { handleAddNotes } = this.props
            handleAddNotes(this.state.body, this.state.title)
            this.setState({ body: '', title: '' })
        } else {
            this.setState({ body: '', title: '' })
        }
    }

    render() {
        return (
            <Form
                handleSumbit={(e) => this.handleAddNote(e)}
                handleData={this.state}
                handleChangeBody={(e) => this.handleChangeBody(e)}
                handleChangeTitle={(e) => this.handleChangeTitle(e)}
                buttonLabel = "Add Notes"
            />
        )
    }
}

export default AddNote
