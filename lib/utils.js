/* jslint node: true */

"use strict";

var fs = require('fs');
var path = require('path');
var _ = require('lodash');

function walk (dir, filter, mapFunc) {

    var results = [],
        list = fs.readdirSync(dir);

    filter = filter || function () { return true; };

    _.each(list, function (file) {

        file = path.join(dir, file);
        var stat = fs.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file, filter, mapFunc));
        }
        else if (filter(file)) {
            results.push(file);
        }
    });

    results = _.map(results, mapFunc);

    return results;
}

function fromJSON (str, defaultRes) {

    var res = null;
    try {
        if (typeof str === 'string') {
            res = JSON.parse(str);
        } else {
            res = str;
        }

    } catch (e) {}

    res = res || defaultRes;

    return res;
}

module.exports = {

    fromJSON: fromJSON,
    walk: walk
};