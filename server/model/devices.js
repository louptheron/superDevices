/**
 * Created by rouxbot on 20/11/15.
 */
'use strict';

var db = require('./db_schemas.js');
var GroupDB = db.group();
var DeviceDB = db.device();
var UserDB = db.user();

var devices = {

    createDevice: function(Name, UID,userID, done) {
        if (!userID) {
            done('Error: `userID` is required.');
        } else {
            var device = new DeviceDB({
                deviceName: Name,
                deviceUID: UID
            });
            device.save(function(err, doc) {
                if (err) {
                    done(err, doc);
                } else {
                    UserDB.findByIdAndUpdate({_id: userID}, {$push: {devices: doc._id}}, function(e) {
                        done(e, doc);
                    });
                }
            });
        }
    },

    activateDevice: function(id, done) {
        GroupDB.findByIdAndUpdate({_id: id}, {state: true}, function(err) {
            done(err);
        });
    },
    desactivateDevice: function(id, done) {
        GroupDB.findByIdAndUpdate(id, {state: false}, function(err) {
            done(err);
        });
    },

    removeDevice: function(deviceID, userID, done) {
        DeviceDB.findByIdAndRemove(deviceID, function(errR, doc) {
            if (errR) {
                done(errR);
            } else {
                GroupDB.findByIdAndUpdate({_id:doc.groups},{$pull: {devices: doc._id}}, function(err) {
                    done(err);
                });
                UserDB.findByIdAndUpdate({_id: userID}  ,{$pull: {devices: doc._id }}, function(err) {
                    done(err);
                });
            }
        });
    },

    getDevice: function(deviceID, done) {
        DeviceDB.findById(deviceID,function(err, doc) {
            done(err, doc);
        });
    }
};

module.exports = devices;
