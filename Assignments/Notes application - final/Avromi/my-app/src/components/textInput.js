import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import TextareaAutosize from 'react-autosize-textarea';

export default class InputText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            title:""
    
            };
            this.handleTitleChange = this.handleTitleChange.bind(this);
            this.handleTextChange = this.handleTextChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
          }

          handleTitleChange(event) {
            this.setState({title: event.target.value});
          }
        
          handleTextChange(event) {
            this.setState({text: event.target.value});
          }
        
          handleSubmit(event) {
            event.preventDefault();
            
            const note = {
                title: this.state.title,
                text: this.state.text,
                date: new Date(),
                id: uuidv4()
            }
            this.props.addNote(note)

            this.setState({text:"", title:''}) 
         
          }
        
          render() {
            return (
              <form onSubmit={this.handleSubmit}>
          
                 <input tyoe="text" placeholder="Note Title" value={this.state.title} onChange={this.handleTitleChange} />
                 <br/>
                  <TextareaAutosize placeholder="Add note here" value={this.state.text} onChange={this.handleTextChange} />
               <br/>
                <input type="submit" value="ADD" />
              </form>
            );
          }
 }