/**
 * Created by rouxbot on 22/11/15.
 */
'use strict';

var express = require('express');
var router = express.Router();
var db = require('../../model/db_interface.js');

module.exports = function(passport) {
    router.post('/change-info', passport.ensureAuthenticated, function(req, res) {
        for (var a in req.body) {
            if (req.body.hasOwnProperty(a)) {
                if (!req.body[a]) {
                    delete req.body[a];
                }
            }
        }

        db.changeInfo(req.user._id, req.body, function(err) {
            res.send({msg: err || 'ok'});
        });
    });
    return router;
};
