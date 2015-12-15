/**
 * Created by rouxbot on 21/11/15.
 */
'use strict';

var db = require('./db_schemas.js');
var UserDB = db.user();
var GroupDB = db.group();
var DeviceDB = db.device();

var groups = {

    createGroup: function(Name,userID, done) {
        if (!userID) {
            done('Error: `userID` is required.');
        } else {
            var group = new GroupDB({
                groupName: Name
            });
            group.save(function(err, doc) {
                if (err) {
                    done(err, doc);
                } else {
                    UserDB.findByIdAndUpdate({_id: userID}, {$push: {groups: doc._id}}, function(e) {
                        done(e, doc);
                    });
                }
            });
        }
    },

    removeGroup: function(groupID, userID, done) {
        GroupDB.findByIdAndRemove(groupID, function(errR, doc) {
            if (errR) {
                done(errR);
            } else {
               /* DeviceDB.findByIdAndUpdate({_id:doc.devices},{$pull: {groups: groupID}}, function(err) {
                 done(err);
                 });*/
                UserDB.findByIdAndUpdate({_id: userID}  ,{$pull: {group: groupID }}, function(err) {
                    done(err);
                });
            }
        });
    },

    getGroup: function(groupID, done) {
        GroupDB.findById(groupID,function(err, doc) {
            done(err, doc);
        });
    },

    getFullDevicesByGroupID: function(id, done) {
        GroupDB.findById(id).populate('devices').exec(function(err, docs) {
            done(err,docs);
        });
    },

    getAvailableDevices: function(userId, groupId, done) {
        GroupDB.findById(groupId).populate('devices').exec(function(err, docs) {
            if(err){
                console.log(err);
            }
            else {
                var ids = [];
                for (var device in docs.devices){
                    if(docs.devices.hasOwnProperty(device)){
                        ids.push(docs.devices[device]._id);
                    }
                }
                UserDB.findOne({_id: userId}).populate({
                    path: 'devices',
                    match: {"_id" : {$nin:ids} }
                }).exec(function (errs, docu) {
                    if (errs){
                        console.log(errs);
                    }
                    else{
                        done(errs, docu);
                    }
                });
            }
        });
    },

    activateGroup: function(groupId, done) {
        GroupDB.findById(groupId).populate('devices').exec(function(err, docs) {
            if(err){
                console.log(err);
            }
            else {
                var ids = [];
                for (var device in docs.devices){
                    if(docs.devices.hasOwnProperty(device)){
                        if(docs.devices[device]._id){
                            ids.push(docs.devices[device]._id);
                        }
                    }
                }
                DeviceDB.update({_id: {$in: ids}}, {state: true}, {multi: true}, function(err) {
                    done(err);
                });
            }
        });
    },

    desactivateGroup: function(groupId, done) {
        GroupDB.findById(groupId).populate('devices').exec(function(err, docs) {
            if(err){
                console.log(err);
            }
            else {
                var ids = [];
                for (var device in docs.devices){
                    if(docs.devices.hasOwnProperty(device)){
                        if(docs.devices[device]._id){
                            ids.push(docs.devices[device]._id);
                        }
                    }
                }
                DeviceDB.update({_id: {$in: ids}}, {state: false}, {multi: true}, function(err) {
                    done(err);
                });
            }
        });
    },

    addDeviceToGroup: function(deviceID, groupID, done) {
        GroupDB.findByIdAndUpdate(groupID, {$addToSet: {devices: deviceID}}, function(errGroup) {
            if (errGroup) {
                done(errGroup);
            } else {
                DeviceDB.findByIdAndUpdate(deviceID, {$addToSet: {groups: groupID}}, function(errDevice) {
                    done(errDevice);
                });
            }
        });
    },
    removeDeviceToGroup: function(deviceID, groupID, done) {
        GroupDB.findByIdAndUpdate(groupID, {$pull: {devices: deviceID}}, function(errGroup) {
            if (errGroup) {
                done(errGroup);
            } else {
                DeviceDB.findByIdAndUpdate(deviceID, {$pull: {groups: groupID}}, function(errUser) {
                    done(errUser);
                });
            }
        });
    }
};

module.exports =groups;
