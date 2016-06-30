var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config/main');
var User = require('../app/models/user');

// Obtain a JWT token
router.post('/token', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    if (!email || !password) {
        res.send({
            success: false,
            message: "Email and password are required" 
        });
    }

    User.findOne({ email: email }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.send({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        }
        else {
            // Check if password matches
            user.comparePassword(password, function(err, isMatch) {
                if (isMatch && !err) {
                    // Create token if the password matched and no error was thrown
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: 10080 // in seconds
                    });

                    res.json({
                        success: true,
                        sub: email,
                        token: token
                    });
                }
                else {
                    res.send({
                        success: false,
                        message: 'Authentication failed. Passwords did not match.'
                    });
                }
            });
        }
    });
});

module.exports = router;