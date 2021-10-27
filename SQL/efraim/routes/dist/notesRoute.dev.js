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
          res.send(allNotes);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post("/addNote", function _callee2(req, res) {
  var note, addedNote;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          note = req.body.note;
          _context2.next = 3;
          return regeneratorRuntime.awrap(addNote(note));

        case 3:
          addedNote = _context2.sent;
          res.send(addedNote);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router["delete"]("/deleteNote/:noteID", function _callee3(req, res) {
  var noteID, deletedNote;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          noteID = req.params.noteID;
          _context3.next = 3;
          return regeneratorRuntime.awrap(deleteNote(noteID));

        case 3:
          deletedNote = _context3.sent;
          res.send(deletedNote);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
});
module.exports = router;