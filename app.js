var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');

var jwt = require('jsonwebtoken');
var config = require('./config/main');
var User = require('./app/models/user');
var adminConfig = require('./config/adminUser');

// Routes
var oauth = require('./routes/oauth');
var index = require('./routes/index');
var users = require('./routes/users');

// Passport
app.use(passport.initialize());
require('./config/passport')(passport);

var port = process.env.PORT || 8080;
mongoose.connect(config.database);
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.get('/setup', function(req, res) {
    var admin = new User({
        name: 'Admin User',
        email: 'admin@automatr.io',
        password: adminConfig.defaultPassword,
        role: 'Admin'
    });

    console.log(admin);

    admin.save(function(err) {
        if (err) throw err;
        console.log('User saved successfully');

        res.json({
            success: true,
            id: admin.id
        });
    });
});

app.use('/oauth', oauth);
app.use('/api', index);
app.use('/api/users', users);

app.listen(port);

console.log('AutomatR server running at http://localhost:' + port);