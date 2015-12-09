/**
 * Created by rouxbot on 22/11/15.
 */
'use strict';

var express = require('express');
var router = express.Router();

module.exports = function(passport) {
    router.get('/account', passport.ensureAuthenticated, function(req, res) {
        res.render('client/user/account', {
            title: req.user.pseudo,
            teams: req.user.teams,
            rosters: req.user.rosters,
            user: (req.user) ? {
                pseudo: req.user.pseudo,
                email: req.user.email,
                age: req.user.age,
                lastName: req.user.lastName,
                firstName: req.user.firstName
            } : null,
            page: {
                account: true
            }
        });
    });

    return router;
};
