/* jslint node: true */

"use strict";

var utils = require('./utils');

module.exports = {

    get: function (key, callback) {
        callback(null, []);
    },

    set: function (key, value, callback) {
        callback(null, { key: key, value: value });
    }
};