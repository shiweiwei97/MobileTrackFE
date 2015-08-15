/* jslint node: true */

"use strict";

var redis   = require('redis'),
    utils   = require('./utils');

var options = {},
    port    = 6379,
    host    = 'localhost',
    client  = redis.createClient(port, host, options);

module.exports = {

    get: function (key, callback) {

        client.get(key, function (err, data) {
            callback(err, utils.fromJSON(data));
        });
    },

    set: function (key, value, callback) {

        if (typeof value !== 'string') {
            value = JSON.stringify(value);
        }

        client.set(key, value, callback);
    }
};