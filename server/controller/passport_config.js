/**
 * Created by rouxbot on 19/11/15.
 */
'use strict';

var LocalStrategy = require('passport-local').Strategy;
var db = require('../model/db_interface.js');

module.exports = function(passport) {
    passport.use('local', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, function(username, password, done) {
            db.getUser(username, function(err, doc) {
                if (err) {
                    done(null, false);
                } else {
                    if (doc && doc.email === username && doc.password === password) {
                        done(null, doc);
                    } else {
                        done(null, false);
                    }
                }
            });
        }
    ));
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        db.getUserById(id, function (err, user) {
            done(null, user);
        });
    });

    passport.ensureAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/content');
        }
    };
};
