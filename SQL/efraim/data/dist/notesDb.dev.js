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
  var queryResult;
  return regeneratorRuntime.async(function addNote$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          console.log("hey");
          _context2.next = 4;
          return regeneratorRuntime.awrap(query("INSERT INTO notes (title, note) VALUES ('".concat(note.title, "', '").concat(note.note, "')")));

        case 4:
          queryResult = _context2.sent;
          return _context2.abrupt("return", queryResult);

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var deleteNote = function deleteNote(note) {
  var queryResult;
  return regeneratorRuntime.async(function deleteNote$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(query("DELETE FROM notes WHERE title='".concat(note.title, "' AND note='").concat(note.note, "';")));

        case 3:
          queryResult = _context3.sent;
          return _context3.abrupt("return", queryResult);

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

module.exports = {
  query: query,
  addNote: addNote,
  getAllNotes: getAllNotes,
  deleteNote: deleteNote
};