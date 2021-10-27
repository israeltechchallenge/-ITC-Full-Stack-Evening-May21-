const mysql = require("mysql")

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "sg35no4s",
    database: "notesdata"
});

const query = (queryText) => {
    return new Promise((resolve, reject) => {
        pool.query(queryText, (err, data) => {
            if(err){
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

const getAllNotes = async () => {
    const allNotes = await query(`SELECT * FROM notes`);
    return allNotes
}

const addNote = async (note) => {
    try{
        const queryResult = await query(`INSERT INTO notes (title, note) VALUES ('${note.title}', '${note.note}')`)
        const allNotes = await getAllNotes()
        return allNotes
    } catch (error){
        console.log(error)
    }
}

const deleteNote = async (noteID) => {
    try{
        const queryResult = await query(`DELETE FROM notes WHERE id=${noteID};`)
        const allNotes = await getAllNotes()
        return allNotes
    } catch (error){
        console.log(error)
    }
}

module.exports = {query, addNote, getAllNotes, deleteNote}