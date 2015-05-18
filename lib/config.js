/* jslint node: true */

"use strict";

var yaml        = require('js-yaml');
var fs          = require('fs');
var objectMerge = require('object-merge');
var log         = require('log4js').getLogger();

var _envConfig;

function Config (file) {

    var config,
        env = process.env.NODE_ENV || 'development';
    try {
        config = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
    } catch (e) {
        log.error(e);
    }

    _envConfig = objectMerge(config['default'], config[env] || {});
}

Config.prototype.getConfig = function () {
    return _envConfig;
};

module.exports = Config;