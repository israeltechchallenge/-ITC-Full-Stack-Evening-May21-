import React, { useContext, useState, useEffect } from "react";
import Moment from "react-moment";
import moment from "moment";
import NoteContext from "../../context/notes/noteContext";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import FormNotes from "./FormNotes";
// import { ModalConsumer } from "../context/ModalContext";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({ //YS: You should add your styles in a separate css file
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const Note = ({ note }) => {
  //* Get the Note Context Function
  const noteContext = useContext(NoteContext);
  const { setCurrentNote, deleteNote, achivedCurrentNote } = noteContext;

  //*Add a current Note when the user Want to edit it
  const currentNote = (note) => {
    setCurrentNote(note);
  };

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteNotes = (id) => {
    deleteNote(id);
  };
  const selectAchivedNote = (note) => {
    achivedCurrentNote(note);
  };

  
  return (
    <li className="note">
 
      <div className="notes-title">
        <p>{note.title}</p>
      </div>
      <div className="notes-noteContent">
        <p>{note.contentNote}</p>
      </div>
      <div className="notes-date">
         <p>{moment(note.date).format("MMM Do YY")}</p>
      </div>
      <div className="notes-date">
        <p>{moment(note.reminderDate).format("MMM Do YY")}</p>
      </div>

      <div className="actions">
        <button
          type="button"
          onClick={() => {
            currentNote(note); //YS: You shouldnt have two function calls with the same click
            handleOpen();
          }}
        >
               {note.reminderDate ===  note.date ? alert('Hey Remaind that you Have a Task') : null}
          Edit
        </button>
        <button
          type="button"
          onClick={() => {
            deleteNotes(note.id); //YS: You shouldnt have two function calls with the same click
            selectAchivedNote(note);
            console.log(note);
          }}
        >
          Delete
        </button>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            <FormNotes />
          </div>
        </Modal>
      </div>
    </li>
  );
};

export default Note;
