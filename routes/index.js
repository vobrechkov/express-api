var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.send({ message: 'Welcome to AutomatR API' });
});

module.exports = router;