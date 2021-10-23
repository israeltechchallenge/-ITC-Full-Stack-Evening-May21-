"use strict";

var express = require('express');

var app = express();
var PORT = 3000;

var todosRoute = require('./routes/todos.js');

app.use(express.json());
app.use('/todos', todosRoute);
app.listen(PORT, function () {
  console.log('Listening');
});