import React, { Component } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from 'react-bootstrap';


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      notes: "",
    };

  }
  
  getTitleValue = (e) => { 
    this.setState({
      title: e.target.value,      
    });
    console.log(this.props.modal)
  };
  getNoteValue = (e) => {
    this.setState({
      notes: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { addNote } = this.props;
    if (this.state.notes !== "") {
      addNote(this.state.title, this.state.notes);
      this.setState({
        title: "",
        notes: "",
      });
    } else {
      alert("You must add a Note");
    }
  };
  
  editHandle = (e) => {
    e.preventDefault();
    const { editNote } = this.props;
    console.log('notaActual', this.props.notaActual)
    if (this.state.notes !== "") {
      const data = {
        title: this.state.title, 
        note: this.state.notes, 
        id: this.props.id,
        update: new Date().toLocaleString("en-GB"),
      }
      editNote(data);
      this.setState({
        title: "",
        notes: "",
      });
      this.props.closeModal()

    } else {
      alert("You must add a Note");
    }
    return;
  };
  

  render() {
    return (
      <div style={{marginBotom: '10px'}}>
        <form

      onSubmit={(e)=> this.props.modal ? this.editHandle(e) : this.handleSubmit(e)}

        >
          <div  style={{ 
                marginTop: "20px" ,   
                width: '100%',
                maxWidth: '600px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',}}
            >
            <label style={{ margin: "10px" }} htmlFor="">
              Title:
            </label>
            <input
              value={this.state.title}
              onChange={this.getTitleValue}
              type="text"
            />
          </div>
          <div  style={{ 
                marginTop: "20px" ,   
                width: '100%',
                maxWidth: '600px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',}}
            >
            <label style={{ margin: "10px" }} htmlFor="">
              Note:
            </label>
            <TextareaAutosize
             value={this.state.notes}
             onChange={this.getNoteValue}
             style={{overflow: 'hidden'}}
              />
          </div>
          <Button
            style={{ marginTop: "20px", paddingTop: "15px", alignContent: "center", justifyContent: "center", color: 'black'}}
            type="submit"
            variant="outline-primary"
          >
            {this.props.modal ? <p>Update Note</p> : <p>NEW NOTE!</p>}
          </Button>
        </form>
      </div>
    );
  }
}

export default Form;


