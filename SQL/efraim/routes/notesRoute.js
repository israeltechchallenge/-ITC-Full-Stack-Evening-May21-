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
    console.log(allNotes)
    res.send(allNotes)
})

router.post("/addNote", (req, res) => {
    const {note} = req.body
    const addedNote = addNote(note)
    res.send("Note Added")
})

router.post("/deleteNote", (req, res) => {
    const {note} = req.body
    const deletedNote = deleteNote(note)
    res.send("Note Deleted")
})

module.exports = router