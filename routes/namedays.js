var express = require('express');
var router = express.Router();

const orthodoxNames = require('../data/names_orthodox.json');
const officialNames = require('../data/names_official.json');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json({
    official: officialNames,
    orthodox: orthodoxNames,
  });
});

module.exports = router;
