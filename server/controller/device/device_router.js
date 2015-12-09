/**
 * Created by rouxbot on 08/12/15.
 */
'use strict';

var express = require('express');
var router = express.Router();
var db = require('../../model/db_interface.js');

module.exports = function(passport) {

    router.get('/:id', passport.ensureAuthenticated, function(req, res) {
        db.getDevice(req.params._id,function(err, docs) {
            if(err)
                res.send({msg: 'probleme'});
            else
                console.log(docs);
            });
        });

    return router;
};
