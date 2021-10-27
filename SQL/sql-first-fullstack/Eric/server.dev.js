"use strict";

var express = require('express');

var app = express();

var cors = require('cors');

var port = process.env.PORT || 3000;
app.use(express["static"]('public'));
app.use(express.json());

var toDoRoute = require('./todosRoute');

app.use('/', toDoRoute);
app.listen(port, function () {
  console.log("Server listening at http://localhost:".concat(port));
});