/**
 * Created by distohm on 11/12/15.
 */

'use strict';

var db = require('../../server/model/db_interface.js');
var dbSchema = require('../../server/model/db_schemas.js');
var mdp = require('./model_data_preparer.js');

var mp = {
    preparers: {
        chainPreparers: function(nextArray) {
            var next = nextArray.splice(0, 1)[0];
            next(nextArray);
        },
        rUserDB: function(nextArray) {
            var userDB = dbSchema.user();
            userDB.remove({ email: mdp.user.email }, function() {
                var next = nextArray.splice(0, 1)[0];
                next(nextArray);
            });
        },
        /*rGroupDB: function(nextArray) {
            var groupDB = dbSchema.group();
            groupDB.remove({}, function() {
                var next = nextArray.splice(0, 1)[0];
                next(nextArray);
            });
        },*/
        rDeviceDB: function(nextArray) {
            var deviceDB = dbSchema.device();
            deviceDB.remove({ deviceUID: mdp.device.deviceUID }, function() {
                var next = nextArray.splice(0, 1)[0];
                next(nextArray);
            });
        },
        aUser: function(nextArray) {
            db.addUser(mp.user.email, mp.user.password, mp.user.pseudo, function() {
                var next = nextArray.splice(0, 1)[0];
                next(nextArray);
            });
        },
        aDevice: function(nextArray) {
            db.addDevice(mp.device.deviceName, mp.device.deviceUID, function() {
                var next = nextArray.splice(0, 1)[0];
                next(nextArray);
            });
        }
        /*aTeam1: function(nextArray) {
            db.getUser(mp.user.email, function(err, doc) {
                db.createTeam(mp.team1.name, mp.team1.tag, doc._id, function() {
                    var next = nextArray.splice(0, 1)[0];
                    next(nextArray);
                });
            });
        },*/

    }
};

require('../config/data')(mp);

module.exports = mp;
