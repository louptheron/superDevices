'use strict';

var db = require('./db_schemas.js');
var UserDB = db.user();
//var GroupDB = db.group();
var DeviceDB = db.device();

var users = {

    addUser: function(email, password, log, done) {
        var user = new UserDB({
            email: email,
            password: password,
            pseudo: log
        });
        user.save(function(err, doc) {
            done(err, doc);
        });
    },
    changeInfo: function(userID, infos, done) {
        UserDB.findByIdAndUpdate(userID, infos, function(err, doc) {
            done(err, doc);
        });
    },
    getUser: function(email, done) {
        UserDB.findOne({email: email}, function(err, doc) {
            done(err, doc);
        });
    },
    getUserById: function (id, done) {
        UserDB.findById(id, function (err, doc) {
            done(err, doc);
        });
    },
    activateUser: function(email, done) {
        UserDB.findOneAndUpdate({email: email}, {active: true}, function(err) {
            done(err);
        });
    },
    desactivateUser: function(email, done) {
        UserDB.findOneAndUpdate({email: email}, {active: false}, function(err) {
            done(err);
        });
    },

    getFullDevicesByUserID: function(id, done) {
        UserDB.findById(id).populate('devices').exec(function(err, docs) {
            done(err,docs);
        });
    },
    getFullGroupsByUserID: function(id, done) {
        UserDB.findById(id).populate('groups').exec(function(err, docs) {
            done(err,docs);
        });
    }
};

module.exports = users;