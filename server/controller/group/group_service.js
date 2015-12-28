/**
 * Created by rouxbot on 10/12/15.
 */
'use strict';

var express = require('express');
var router = express.Router();
var db = require('../../model/db_interface.js');

module.exports = function(passport) {

    router.post('/connect', passport.ensureAuthenticated, function(req, res) {
            db.addGroup(req.body.groupName, req.user._id, function(err) {
                if (err) {
                    if (err.toString().indexOf('groupName') >= 0) {
                        res.send({msg: 'group name needed'});
                    }  else {
                        res.send(err);
                    }
                } else {
                    res.send({msg: 'ok'});
                }
            });
    });

    router.post('/desactivate', passport.ensureAuthenticated, function(req, res) {
        if(req.body.id){
            db.desactivateGroup(req.body.id, function(err, doc){
                if(err){
                    res.send({msg: "ko"});
                    console.log(err);
                }
                else {
                    res.send({msg: "ok"});
                }
            })
        }
        else {
            res.send({msg: "ko"});
        }
    });

    router.post('/activate', passport.ensureAuthenticated, function(req, res) {
        if(req.body.id){
            db.activateGroup(req.body.id, function(err, doc){
                if(err){
                    res.send({msg: "ko"});
                    console.log(err);
                }
                else {
                    res.send({msg: "ok"});
                }
            })
        }
        else {
            res.send({msg: "ko"});
        }
    });


        router.post('/changeState', passport.ensureAuthenticated, function(req, res) {
        if(req.body.state && req.body.id){
            if (req.body.state == "true") {
                db.desactivateGroup(req.body.id, function (err) {
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
                db.activateGroup(req.body.id, function (err) {
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
            db.removeGroup (req.body.id, req.user._id, function (err) {
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

   router.post('/add', passport.ensureAuthenticated,function(req, res) {
        db.getAvailableDevices(req.user._id , req.body.id, function(err,docs) {
           res.send({
                devices: docs.devices,
                groupName: req.body.name
            });
        });
    });

    router.post('/show', passport.ensureAuthenticated,function(req, res) {
        db.getDevicesToGroup(req.body.id, function(err,docs) {
            res.send({
                devices: docs.devices,
                groupName: req.body.name
            });
        });
    });

    router.post('/addDevice', passport.ensureAuthenticated,function(req, res) {
        if(req.body.idDevice && req.body.idGroup){
            db.addDeviceToGroup(req.body.idDevice, req.body.idGroup, function (err) {
                if(err){
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

    router.post('/removeDevice', passport.ensureAuthenticated,function(req, res) {
        if(req.body.idDevice && req.body.idGroup){
            db.removeDeviceToGroup(req.body.idDevice, req.body.idGroup, function (err) {
                if(err){
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
    return router;
};
