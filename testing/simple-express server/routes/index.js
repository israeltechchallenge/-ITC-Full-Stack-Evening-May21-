var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.send({ message: 'hello world' });
});

module.exports = router;
