/**
 * Created by rouxbot on 08/12/15.
 */
var express = require('express');
var router = express.Router();
var db = require('../../model/db_interface.js');

module.exports = function(passport) {

    router.post('/changeState', passport.ensureAuthenticated, function(req, res) {
        if(req.body.state && req.body.id){
            if (req.body.state == "true") {
                db.desactivateDevice(req.body.id, function (err) {
                    if(err){
                        res.send({msg: "ko"});
                        console.log(err);
                    }
                    else {
                        res.send({msg: "ok"});
                    }
                });
            }
            else if (req.body.state == "false") {
                db.activateDevice(req.body.id, function (err) {
                    if(err){
                        res.send({msg: "ko"});
                        console.log(err);
                    }
                    else {
                        res.send({msg: "ok"});
                    }
                });
            }
            else {
                res.send({msg: "ko"});
            }
        }
        else {
            res.send({msg: "ko"});
        }

    });

    router.post('/delete', passport.ensureAuthenticated, function(req, res) {
        if(req.body.id){
            db.removeDevice (req.body.id, req.user._id, function (err) {
                if(err){
                    console.log(err);
                    res.send({msg : "ko"});
                }
                else {
                    res.send({msg : "ok"});

                }
            });
        }
        else {
            res.send({msg : "ko"});
        }
    });

    router.post('/connect', passport.ensureAuthenticated, function(req, res) {
        db.addDevice(req.body.deviceName, req.body.deviceUID, req.user._id, function(err) {
            if (err) {
                if (err.toString().indexOf('duplicate key') >= 0) {
                    res.send({msg: 'device UID already exist'});
                }
                else if (err.toString().indexOf('deviceName') >= 0) {
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
