var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../app/models/user');
var config = require('../config/main');

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(payload, cb) {
        User.findOne({ id: payload.id }, function(err, user) {
            if (err) return cb(err, false);

            if (user) {
                cb(null, user);
            } else {
                cb(null, false);
            }
        });
    }));
};