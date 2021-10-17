import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import TextareaAutosize from "react-textarea-autosize";
import DateTimePicker from "react-datetime-picker";

function CreateTask({ modal, toggle, addNote }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setDateRemind] = useState(new Date());

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handelDescriptionsChange = (e) => {
    setDescription(e.target.value);
  };

  const handelReminderChange = (e) => {
    setDateRemind(e);
  };

  const submitNote = (e) => {
    e.preventDefault();

    if (title === "" && description === "") {
      alert("Cannot creat an empty task");
      return;
    }
    let newNote = {
      title: title,
      description: description,
      id: uuidv4(),
      date: moment().format("MMM Do  h:mm A"),
      dateRemind: value,
      updateDate: null,
    };

    addNote(newNote);
    setTitle("");
    setDescription("");
    setDateRemind("");
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create your task</ModalHeader>
      <ModalBody>
        <form>
          <div className="form-group">
            <label>Task name</label>
            <input
              type="text"
              className="form-control tm-2"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <label>Description</label>
          <div className="form-group">
            <TextareaAutosize
              className="form-control"
              value={description}
              onChange={handelDescriptionsChange}
            />
          </div>
          <label>Date to remind</label>
          <div className="form-group"></div>
          <DateTimePicker
            className="form-control"
            value={value}
            onChange={handelReminderChange}
            required
          />
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={submitNote}>
          Add task
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default CreateTask;
