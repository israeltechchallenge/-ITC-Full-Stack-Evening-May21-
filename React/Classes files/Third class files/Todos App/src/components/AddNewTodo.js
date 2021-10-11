import React from 'react'
import { v4 as uuidv4 } from 'uuid';

class AddNewTodo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
    }
    addTodo(e) {
        e.preventDefault()
        //Somehow add the new to too to the list
        const newTodo = {id:uuidv4(), text:this.state.text}
        this.props.addTodo(newTodo)
        this.setState({text:''})
        e.target.reset()
    }
    render() {
        return <div style={{marginTop:10}}>
            <form onSubmit={(e) => this.addTodo(e)}>
                <input type="text" value={this.state.text} onChange={(e) => this.setState({text:e.target.value})} />
                <input type="submit" value="Add Note" />
            </form>
        </div>
    }
}
export default AddNewTodo