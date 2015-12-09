/**
 * Created by rouxbot on 21/11/15.
 */
'use strict';

var db = require('./db_schemas.js');
var UserDB = db.user();
var GroupDB = db.group();
var DeviceDB = db.device();

var groups = {
    createGroup: function(name,  done) {
        var group = new GroupDB({
            groupName: name
        });
        group.save(function(err, doc) {
            done(err, doc);
        });
    },
    activateGroup: function(id, done) {
        GroupDB.findByIdAndUpdate({_id: id}, {state: true}, function(err) {
            done(err);
        });
    },
    desactivateGroup: function(id, done) {
        GroupDB.findByIdAndUpdate(id, {state: false}, function(err) {
            done(err);
        });
    },
    addDeviceToGroup: function(deviceID, groupID, done) {
        GroupDB.findByIdAndUpdate(groupID, {$addToSet: {devices: deviceID}}, function(errGroup) {
            if (errGroup) {
                done(errGroup);
            } else {
                DeviceDB.findByIdAndUpdate(deviceID, {$addToSet: {groups: groupID}}, function(errUser) {
                    done(errUser);
                });
            }
        });
    },
    removeDeviceFromGroup: function(deviceID, groupID, done) {

        GroupDB.findByIdAndUpdate(groupID, {$pull: {devices: deviceID}}, function(errGroup) {
            if (errGroup) {
                done(errGroup);
            } else {
                DeviceDB.findByIdAndUpdate(deviceID, {$pull: {groups: groupID}}, function(errUser) {
                    done(errUser);
                });
            }
        });
    },

    isMember: function(deviceID, groupID, done) {
        GroupDB.findOne({_id: groupID, devices: deviceID}, function(err, doc) {
            done(!!doc);
        });
    }
};

module.exports =groups;
