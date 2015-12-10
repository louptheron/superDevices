/**
 * Created by rouxbot on 19/11/15.
 */
'use strict';

var express = require('express');
var exphbs = require('express-handlebars');
var session = require('express-session');
var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);

require('./passport_config.js')(passport);
var client = require('./common/common_router.js')(passport);
var clientServices = require('./common/common_service.js')(passport);
//var device = require('./device/device_router.js')(passport);
var deviceServices = require('./device/device_service.js')(passport);

var hbs = exphbs.create({
    defaultLayout: 'client',
    partialsDir: [
        'views/pages/partials/'
    ]
});

var app = express();


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static('resources'));
// BEGIN passport config
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: require('../config/dev.js').secret,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({url: require('../config/dev.js').mongo})
}));
app.use(passport.initialize());
app.use(passport.session());
// END passport config

app.use(express.static('resources'));

app.use('/', client);
app.use('/', clientServices);
//app.use('/device', device);
app.use('/device', deviceServices);

module.exports = app;
