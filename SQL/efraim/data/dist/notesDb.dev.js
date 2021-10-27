"use strict";

var mysql = require("mysql");

var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "sg35no4s",
  database: "notesdata"
});

var query = function query(queryText) {
  return new Promise(function (resolve, reject) {
    pool.query(queryText, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

var getAllNotes = function getAllNotes() {
  var allNotes;
  return regeneratorRuntime.async(function getAllNotes$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(query("SELECT * FROM notes"));

        case 2:
          allNotes = _context.sent;
          return _context.abrupt("return", allNotes);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

var addNote = function addNote(note) {
  var queryResult, allNotes;
  return regeneratorRuntime.async(function addNote$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(query("INSERT INTO notes (title, note) VALUES ('".concat(note.title, "', '").concat(note.note, "')")));

        case 3:
          queryResult = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(getAllNotes());

        case 6:
          allNotes = _context2.sent;
          return _context2.abrupt("return", allNotes);

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

var deleteNote = function deleteNote(noteID) {
  var queryResult, allNotes;
  return regeneratorRuntime.async(function deleteNote$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(query("DELETE FROM notes WHERE id=".concat(noteID, ";")));

        case 3:
          queryResult = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(getAllNotes());

        case 6:
          allNotes = _context3.sent;
          return _context3.abrupt("return", allNotes);

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

module.exports = {
  query: query,
  addNote: addNote,
  getAllNotes: getAllNotes,
  deleteNote: deleteNote
};