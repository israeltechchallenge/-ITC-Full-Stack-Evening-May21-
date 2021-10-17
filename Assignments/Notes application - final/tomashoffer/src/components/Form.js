import React, { Component } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      notes: "",
      reminder: "",
    };
  }

  getTitleValue = (e) => {
    this.setState({
      title: e.target.value,
    });
    console.log(this.props.modal);
  };
  getNoteValue = (e) => {
    this.setState({
      notes: e.target.value,
    });
  };
  getNoteReminder = (e) => {
    this.setState({
      reminder: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { addNote } = this.props;
    if (this.state.notes !== "") {
      const newNote = {
        title: this.state.title,
        note: this.state.notes,
        date: Date.now(),
        id: uuidv4(),
        update: null,
        reminder: this.state.reminder,
      };
      addNote(newNote);
      this.setState({
        title: "",
        notes: "",
        reminder: "",
      });
    } else {
      alert("You must add a Note");
    }
  };

  editHandle = (e) => {
    e.preventDefault();
    const { editNote } = this.props;
    console.log("notaActual", this.props.notaActual);
    if (this.state.notes !== "") {
      const data = {
        title: this.state.title,
        note: this.state.notes,
        id: this.props.id,
        update: Date.now(),
        reminder: this.state.reminder,
      };
      editNote(data);
      this.setState({
        title: "",
        notes: "",
        reminder: "",
      });
      this.props.closeModal();
    } else {
      alert("You must add a Note");
    }
    return;
  };

  render() {
    return (
      <div>
        <form
          onSubmit={(e) =>
            this.props.modal ? this.editHandle(e) : this.handleSubmit(e)
          }
        >
          <div
            style={{
              marginTop: "20px",
              width: "100%",
              maxWidth: "600px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
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
          <div
            style={{
              marginTop: "20px",
              width: "100%",
              maxWidth: "600px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <label style={{ margin: "10px" }} htmlFor="">
              Note:
            </label>
            <TextareaAutosize
              value={this.state.notes}
              onChange={this.getNoteValue}
              style={{ overflow: "hidden" }}
            />
          </div>
          <div
            style={{
              marginTop: "20px",
              width: "100%",
              maxWidth: "600px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <label style={{ margin: "10px" }} htmlFor="">
              Date:
            </label>
            <input
              value={this.state.reminder}
              onChange={this.getNoteReminder}
              type="date"
            />
          </div>
          <Button
            style={{ marginTop: "20px", marginRight: "10px", color: "white" }}
            type="submit"
            variant="primary"
          >
            {this.props.modal ? "UPDATE" : "ADD NOTE"}
          </Button>
        </form>
      </div>
    );
  }
}

export default Form;
