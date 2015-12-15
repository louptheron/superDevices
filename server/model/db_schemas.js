/**
 * Created by rouxbot on 20/11/15.
 */
'use strict';

var mongoose = require('mongoose');
var validator = require('validator');
mongoose.connect(require('../config/dev').mongo);
var Schema = mongoose.Schema;

var userSchema = Schema({
    email: {
        type: String, required: true, unique: true,
        validate: [validator.isEmail, 'invalid email']
    },
    pseudo: {type: String, required: true},
    password: {type: String, required: true},
    lastName: String,
    firstName: String,
    active: {type: Boolean, required: true, default: true},
    devices: [{type: Schema.Types.ObjectId, ref: 'Devices'}],
    groups: [{type: Schema.Types.ObjectId, ref: 'Groups'}]
});

var deviceSchema = Schema({
    deviceName: {type: String, required: true},
    deviceUID: {type: Number, required: true, unique: true},
    state: {type:Boolean, default:true},
    groups: [{type: Schema.Types.ObjectId, ref: 'Groups'}]
});

var groupSchema = Schema({
    groupName: {type: String, required: true},
    devices: [{type: Schema.Types.ObjectId, ref: 'Devices'}],
    state: {type:Boolean,default:false},
});

module.exports = {
    disconnect: function() {
        mongoose.disconnect();
    },
    user: function() {
        return mongoose.model('Users', userSchema);
    },
    device: function() {
        return mongoose.model('Devices', deviceSchema);
    },
    group: function() {
        return mongoose.model('Groups', groupSchema);
    }
};
