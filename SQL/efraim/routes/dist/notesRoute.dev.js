"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../data/notesDb"),
    query = _require.query,
    addNote = _require.addNote,
    getAllNotes = _require.getAllNotes,
    deleteNote = _require.deleteNote;

query("CREATE TABLE IF NOT EXISTS notes (\n        id INT(200) AUTO_INCREMENT,\n        title VARCHAR(50) NOT NULL,\n        note VARCHAR(300) NOT NULL,\n        created_date DATE DEFAULT (CURRENT_DATE),\n        PRIMARY KEY (id))").then(function () {
  return console.log("Table Created");
})["catch"](function (err) {
  return console.log(err);
});
router.get("/getAllNotes", function _callee(req, res) {
  var allNotes;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getAllNotes());

        case 2:
          allNotes = _context.sent;
          console.log(allNotes);
          res.send(allNotes);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post("/addNote", function (req, res) {
  var note = req.body.note;
  var addedNote = addNote(note);
  res.send("Note Added");
});
router.post("/deleteNote", function (req, res) {
  var note = req.body.note;
  var deletedNote = deleteNote(note);
  res.send("Note Deleted");
});
module.exports = router;