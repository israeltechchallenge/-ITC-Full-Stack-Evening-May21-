const express = require("express");
const router = express.Router();
const {query, addNote, getAllNotes, deleteNote} = require("../data/notesDb");

query(
    `CREATE TABLE IF NOT EXISTS notes (
        id INT(200) AUTO_INCREMENT,
        title VARCHAR(50) NOT NULL,
        note VARCHAR(300) NOT NULL,
        created_date DATE DEFAULT (CURRENT_DATE),
        PRIMARY KEY (id))`
).then(() => console.log("Table Created"))
.catch((err) => console.log(err))

router.get("/getAllNotes", async (req, res) => {
    const allNotes = await getAllNotes()
    res.send(allNotes)
})

router.post("/addNote", async (req, res) => {
    const {note} = req.body
    const addedNote = await addNote(note)
    res.send(addedNote)
})

router.delete("/deleteNote/:noteID", async (req, res) => {
    const {noteID} = req.params
    const deletedNote = await deleteNote(noteID)
    res.send(deletedNote)
})

module.exports = router