/**
 * Created by rouxbot on 22/11/15.
 */
'use strict';

//var dbGroup = require('./groups.js');
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

    addDevice: dbDevices.createDevice,
    removeDevice: dbDevices.removeDevice,
    getDevice: dbDevices.getDevice,
    activateDevice: dbDevices.activateDevice,
    desactivateDevice: dbDevices.desactivateDevice

};

module.exports = db;
