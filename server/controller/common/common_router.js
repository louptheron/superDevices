/**
 * Created by rouxbot on 19/11/15.
 */
'use strict';

var express = require('express');
var router = express.Router();
var db = require('../../model/db_interface.js');

module.exports = function(passport) {
    router.get('/', function(req, res) {
        res.render('pages/content', {
            title: 'Home',
            user: (req.user) ? {pseudo: req.user.pseudo} : null
        });
    });

    router.get('/content', function(req, res) {
        res.redirect('/');
    });

    router.get('/register', function(req, res) {
        res.render('pages/register', {
            title: 'Register'
        });
    });

    router.get('/connectDevice', passport.ensureAuthenticated, function(req, res) {
            res.render('pages/connectDevice', {
                title: "createDevice",
                user: (req.user) ? {pseudo: req.user.pseudo} : null
            });
        });

    router.get('/manageDevices', passport.ensureAuthenticated, function(req, res) {
        db.getDevices(req.user._id , function(err,docs) {
            res.render('pages/manageDevices', {
                title: "Devices",
                devices: docs.devices,
                user: (req.user) ? {pseudo: req.user.pseudo} : null
            });
        });
    });

    router.get('/manageGroups', passport.ensureAuthenticated,function(req, res) {
        db.getGroups(req.user._id,function(err,docs) {
            res.render('pages/manageGroups', {
                title: "Groups",
                groups: docs.groups,
                user: (req.user) ? {pseudo: req.user.pseudo} : null
            });
        });
    });

    router.get('/login', function (req, res) {
        res.render('pages/login', {
            title: 'login',
            user: (req.user) ? {pseudo: req.user.pseudo} : null
        });
    });

    return router;
};
