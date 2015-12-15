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

    getDevicesForChoose: function(userId,groupId, done) {
        GroupDB.findById(groupId).populate('devices').exec(function(err, docs) {
            if(err){
                done(err);
            }
            else if(!docs){
                done(docs);
            }
            else {

                UserDB.findById(userId).populate({
                    path: 'devices',
                    matcht: {_id: {$ne: docs.devices._id}},
                    select: ('deviceName _id')
                }).exec(function (errs, docu) {
                    if (errs)
                        done(errs);
                    else if (!docu)
                        done(errs);
                    else
                        done(errs, docu);
                });
            }
        });
    },
    activateGroup: function(id, done) {
        GroupDB.findByIdAndUpdate({_id: id}, {state: true}, function(err) {
            if(err){
                done(err);
            }/*else{
                GroupDB.getFullDevicesByGroupID({_id: id}, function(err,docs){
                    for (var item in docs.devices){
                        DeviceDB.activateDevice(docs.devices[item]._id,function(err){
                            done(err);
                        });
                    }
                });
            }*/
        });
    },
    desactivateGroup: function(id, done) {
        GroupDB.findByIdAndUpdate({_id: id}, {state: false}, function(err) {
            if(err){
                done(err);
            }/*else{
                GroupDB.getFullDevicesByGroupID(id, function(err,docs){
                    for (var item in docs.devices){
                        DeviceDB.desactivateDevice(docs.devices[item]._id,function(err){
                            done(err);
                        });
                    }
                });
            }*/
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
