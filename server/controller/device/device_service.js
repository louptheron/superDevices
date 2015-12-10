/**
 * Created by rouxbot on 08/12/15.
 */
var express = require('express');
var router = express.Router();
var db = require('../../model/db_interface.js');

module.exports = function(passport) {

    router.post('/changeState', passport.ensureAuthenticated, function(req, res) {
        var splitedPost = req.body.id.split("+");
        if (splitedPost[1] == "true") {
            db.desactivateDevice(splitedPost[0], function (err) {
                if(err){
                    res.send({msg: "ko"});
                    console.log(err);
                }
                else {
                    res.send({msg: "ok"});
                }
            });
        }
        else if (splitedPost[1] == "false") {
            db.activateDevice(splitedPost[0], function (err) {
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
            console.log("error in server in post /changeDeviceState");
            res.send({msg: "ko"});
        }
    });

    router.post('/delete', passport.ensureAuthenticated, function(req, res) {
        db.removeDevice (req.body.id, req.user._id, function (err) {
            if(err){
                console.log(err);
                res.send({msg : "ko"});
            }
        });
        res.send({msg : "ok"});
    });

    router.post('/connect', passport.ensureAuthenticated, function(req, res) {
        console.log(req);
        db.addDevice(req.body.deviceName, req.body.deviceUID, req.user._id, function(err) {
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
