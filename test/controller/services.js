/**
 * Created by distohm on 11/12/15.
 */

'use strict';
/* globals describe, it, before, after */

var should = require('should');
require('should-http');
var supertest = require('supertest');
var cp = require('./controller_preparer');
var mp = require('../model/model_preparer');
var db = require('../../server/model/db_interface');

var agent = supertest.agent(require('../../server/controller/express_server.js'));

describe('Routing client services', function() {
    after(function(done) {
        mp.preparers.chainPreparers([
            mp.preparers.rUserDB,
            //mp.preparers.rGroupDB,
            mp.preparers.rDeviceDB,
            function() {
                done();
            }
        ]);
    });

    describe('POST /register', function() {
        before(function(done) {
            mp.preparers.chainPreparers([
                mp.preparers.rUserDB,
                function() {
                    done();
                }
            ]);
        });

        it('register a new user', function(done) {
            agent.post('/register').send({
                email: cp.user.email,
                password: cp.user.password,
                pseudo: cp.user.pseudo
            }).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                should(res.body.msg).be.equal('ok');
                db.getUser(cp.user.email, function(err, doc) {
                    should.not.exist(err);
                    should(doc.email).be.equal(cp.user.email);
                    should(doc.password).be.equal(cp.user.password);
                    should(doc.pseudo).be.equal(cp.user.pseudo);
                    done();
                });
            });
        });

        it('can\'t register email exists', function(done) {
            agent.post('/register').send({
                email: cp.user.email,
                password: cp.user.password,
                pseudo: cp.user.pseudo
            }).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                should(res.body.msg).be.equal('email exist');
                done();
            });
        });

        it('can\'t register no email', function(done) {
            agent.post('/register').send({
                email: null,
                password: cp.user.password,
                pseudo: cp.user.pseudo
            }).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                should(res.body.msg).be.equal('email needed or invalid');
                done();
            });
        });

        it('can\'t register no password', function(done) {
            agent.post('/register').send({
                email: cp.user.email,
                password: null,
                pseudo: cp.user.pseudo
            }).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                should(res.body.msg).be.equal('password needed');
                done();
            });
        });

        it('can\'t register no pseudo', function(done) {
            agent.post('/register').send({
                email: cp.user.email,
                password: cp.user.password,
                pseudo: null
            }).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                should(res.body.msg).be.equal('pseudo needed');
                done();
            });
        });

        it('can\'t register mail invalid', function(done) {
            agent.post('/register').send({
                email: 'fake',
                password: cp.user.password,
                pseudo: cp.user.pseudo
            }).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                should(res.body.msg).be.equal('email needed or invalid');
                done();
            });
        });
    });

    describe('/login', function() {
        before(function(done) {
            mp.preparers.chainPreparers([
                mp.preparers.rUserDB,
                mp.preparers.aUser,
                function() {
                    done();
                }
            ]);
        });

        it('login user', function(done) {
            agent.post('/login').send({
                email: cp.user.email,
                password: cp.user.password
            }).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                should(res.body.msg).be.equal('ok');
                done();
            });
        });

        it('fail wrong password', function(done) {
            agent.post('/login').send({
                email: cp.user.email,
                password: 'wrong'
            }).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(401);
                done();
            });
        });

        it('fail wrong email', function(done) {
            agent.post('/login').send({
                email: 'wrong',
                password: cp.user.password
            }).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(401);
                done();
            });
        });
    });

    describe('/logout', function() {
        before(function(done) {
            mp.preparers.chainPreparers([
                mp.preparers.rUserDB,
                mp.preparers.aUser,
                function() {
                    agent.post('/login').send({
                        email: cp.user.email,
                        password: cp.user.password
                    }).end(function() {
                        done();
                    });
                }
            ]);
        });

        it('log out the user', function(done) {
            agent.post('/logout').send().end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(302);
                res.should.have.header('location', '/');
                done();
            });
        });
    });

    describe('/device/connect', function() {
        before(function(done) {
            mp.preparers.chainPreparers([
                mp.preparers.rUserDB,
                mp.preparers.aUser,
                function() {
                    agent.post('/login').send({
                        email: cp.user.email,
                        password: cp.user.password
                    }).end(function() {
                        done();
                    });
                }
            ]);
        });

        after(function(done) {
            mp.preparers.chainPreparers([
                mp.preparers.rDeviceDB,
                function() {
                    done();
                }
            ]);
        });

        it('connect a device', function(done) {
            agent.post('/device/connect').send({
                deviceName : cp.device.deviceName,
                deviceUID : cp.device.deviceUID
            }).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                should(res.body.msg).be.equal('ok');
                done();
            });
        });

        it('device UID already exist', function(done) {
            agent.post('/device/connect').send({
                deviceName : cp.device.deviceName,
                deviceUID : cp.device.deviceUID
            }).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                should(res.body.msg).be.equal('device UID already exist');
                done();
            });
        });

        it('device name needed', function(done) {
            agent.post('/device/connect').send({
                deviceName : null,
                deviceUID : cp.device.deviceUID
            }).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                should(res.body.msg).be.equal('device name needed');
                done();
            });
        });

        it('device UID needed', function(done) {
            agent.post('/device/connect').send({
                deviceName : cp.device.deviceName,
                deviceUID : null
            }).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                should(res.body.msg).be.equal('UID needed');
                done();
            });
        });
    });

    describe('/device/changeState', function() {
        var deviceId, userId = null;
        before(function(done) {
            mp.preparers.chainPreparers([
                mp.preparers.rUserDB,
                mp.preparers.aUser,
                function() {
                    agent.post('/login').send({
                        email: cp.user.email,
                        password: cp.user.password
                    }).end(function() {
                        db.getUser(cp.user.email, function(err, doc){
                            if(doc){
                                userId = doc._id;
                                db.addDevice(cp.device.deviceName, cp.device.deviceUID, userId, function(err, doc) {
                                    if(doc){
                                        deviceId = doc._id;
                                    }
                                    else{
                                        console.log(err);
                                    }
                                    done();
                                })
                            }
                        });
                    });
                }
            ]);
        });

        after(function(done) {
            mp.preparers.chainPreparers([
                mp.preparers.rDeviceDB,
                function() {
                    done();
                }
            ]);
        });

        it('change state', function(done) {
            agent.post('/device/changeState').send({
                id : deviceId,
                state : "false"
            }).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                should(res.body.msg).be.equal('ok');
                done();
            });
        });

        it('device UID needed', function(done) {
            agent.post('/device/changeState').send({
                id : null,
                state : cp.deviceState.state
            }).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                should(res.body.msg).be.equal('ko');
                done();
            });
        });

        it('device state needed', function(done) {
            agent.post('/device/changeState').send({
                id : deviceId,
                state : null
            }).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                should(res.body.msg).be.equal('ko');
                done();
            });
        });

        it('device state not valid', function(done) {
            agent.post('/device/changeState').send({
                id : deviceId,
                state : "fuckya"
            }).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                should(res.body.msg).be.equal('ko');
                done();
            });
        });
    });

    describe('/device/delete', function() {
        var deviceId, userId = null;
        before(function(done) {
            mp.preparers.chainPreparers([
                mp.preparers.rUserDB,
                mp.preparers.aUser,
                function() {
                    agent.post('/login').send({
                        email: cp.user.email,
                        password: cp.user.password
                    }).end(function() {
                        db.getUser(cp.user.email, function(err, doc){
                            if(doc){
                                userId = doc._id;
                                db.addDevice(cp.device.deviceName, cp.device.deviceUID, userId, function(err, doc) {
                                    if(doc){
                                        deviceId = doc._id;
                                    }
                                    else{
                                        console.log(err);
                                    }
                                    done();
                                })
                            }
                        });
                    });
                }
            ]);
        });

        it('delete device', function(done) {
            agent.post('/device/delete').send({
                id : deviceId
            }).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                should(res.body.msg).be.equal('ok');
                done();
            });
        });

        it('device id needed', function(done) {
            agent.post('/device/delete').send({
                id : null
            }).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                should(res.body.msg).be.equal('ko');
                done();
            });
        });
    });
});
