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
        console.log("hey")
        const queryResult = await query(`INSERT INTO notes (title, note) VALUES ('${note.title}', '${note.note}')`)
        return queryResult
    } catch (error){
        console.log(error)
    }
}

const deleteNote = async (note) => {
    try{
        const queryResult = await query(`DELETE FROM notes WHERE title='${note.title}' AND note='${note.note}';`)
        return queryResult
    } catch (error){
        console.log(error)
    }
}

module.exports = {query, addNote, getAllNotes, deleteNote}