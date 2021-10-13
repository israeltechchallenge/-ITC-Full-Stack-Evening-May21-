import React from 'react';
import { v4 as uuidv4 } from 'uuid';


export default class InputText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '',
    

            };

            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
          }
        
          handleChange(event) {
            this.setState({value: event.target.value});
          }
        
          handleSubmit(event) {
            event.preventDefault();
            alert('A note was submitted: ' + this.state.value);
            const note = {
                text: this.state.value,
                date: new Date(),
                id: uuidv4()
            }
            this.props.addNote(note)

            this.setState({value:""}) //is this correct practice to clear form?
         
          }
        
          render() {
            return (
              <form onSubmit={this.handleSubmit}>
                <label>
                 
                  <textarea placeholder="Add note here" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="ADD" />
              </form>
            );
          }
 }