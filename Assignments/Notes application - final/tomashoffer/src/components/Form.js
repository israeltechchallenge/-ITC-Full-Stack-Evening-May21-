import React, { Component } from "react";
import TextareaAutosize from 'react-textarea-autosize';

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
  
  render() {
    return (
      <div>
        <form
         
          onSubmit={(e) => this.handleSubmit(e)}
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
          <button
            style={{ margin: "20px" }}
            type="submit"
            className="btn btn-primary"
          >
            Add Note
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
