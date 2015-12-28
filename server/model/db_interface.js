/**
 * Created by rouxbot on 22/11/15.
 */
'use strict';
var dbGroups = require('./groups.js');
var dbUsers = require('./users.js');
var dbDevices = require('./devices.js');

var db = {
    addUser: dbUsers.addUser,
    changeInfo: dbUsers.changeInfo,
    getUser: dbUsers.getUser,
    activateUser: dbUsers.activateUser,
    desactivateUser: dbUsers.desactivateUser,
    getUserById: dbUsers.getUserById,
    getDevices: dbUsers.getFullDevicesByUserID,
    getGroups: dbUsers.getFullGroupsByUserID,

    addDevice: dbDevices.createDevice,
    removeDevice: dbDevices.removeDevice,
    getDevice: dbDevices.getDevice,
    activateDevice: dbDevices.activateDevice,
    desactivateDevice: dbDevices.desactivateDevice,

    addGroup: dbGroups.createGroup,
    removeGroup: dbGroups.removeGroup,
    getGroup: dbGroups.getGroup,
    getGroupFromName: dbGroups.getGroupFromName,
    activateGroup: dbGroups.activateGroup,
    desactivateGroup: dbGroups.desactivateGroup,
    addDeviceToGroup: dbGroups.addDeviceToGroup,
    removeDeviceToGroup: dbGroups.removeDeviceToGroup,
    getDevicesToGroup: dbGroups.getFullDevicesByGroupID,
    getAvailableDevices: dbGroups.getAvailableDevices
};

module.exports = db;
