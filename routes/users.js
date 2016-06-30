var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

router.get('/me', function (req, res) {
    res.json({
        success: req.user ? true : false,
        data: req.user || []
    });
});

module.exports = router;
