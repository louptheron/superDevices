/**
 * Created by rouxbot on 22/11/15.
 */
'use strict';

var express = require('express');
var router = express.Router();
var db = require('../../model/db_interface.js');

module.exports = function(passport) {
    router.post('/login', passport.authenticate('local'), function (req, res) {
        res.render('pages/content', {
            title: "Welcome",
            user: (req.user) ? {pseudo: req.user.pseudo} : null
        });
    });

    router.post('/register', function(req, res) {
        db.addUser(req.body.email, req.body.password, req.body.pseudo, function(err) {
            if (err) {
                if (err.code === 11000) {
                    res.send({msg: 'email exist'});
                } else if (err.toString().indexOf('pseudo') >= 0) {
                    res.send({msg: 'pseudo needed'});
                } else if (err.toString().indexOf('password') >= 0) {
                    res.send({msg: 'password needed'});
                } else if (err.toString().indexOf('email') >= 0) {
                    res.send({msg: 'email needed or invalid'});
                } else {
                    res.send(err);
                }
            } else {
                res.send({msg: 'ok'});
            }
        });
    });

    router.post('/connectDevice',passport.ensureAuthenticated, function(req, res) {
        db.addDevice(req.body.deviceName, req.body.deviceUID,req.user._id,function(err) {
            if (err) {
                if (err.toString().indexOf('deviceName') >= 0) {
                    res.send({msg: 'device name needed'});
                } else if (err.toString().indexOf('deviceUID') >= 0) {
                    res.send({msg: 'UID needed'});
                } else {
                    res.send(err);
                }
            } else {
                res.send({msg: 'ok'});
            }
        });
    });

    return router;
};