/**
 * Created by distohm on 11/12/15.
 */

'use strict';

var config = {
    user: {
        email: 'username@domain.com',
        pseudo: 'pseudo',
        password: 'password'
    },
    device: {
        deviceName: 'myDeviceName',
        deviceUID: '0123456789',
        _id: "566bfa09e4a14c613d218f42"
    },
    group: {
        groupName: 'myGroupName'
    },
    deviceState: {
        state: "false"
    }
};

module.exports = function(obj) {
    for (var a in config) {
        if (config.hasOwnProperty(a)) {
            obj[a] = config[a];
        }
    }
};
