/* jslint node: true */

"use strict";

var express     = require('express'),
    utils       = require('../../../lib/utils'),
    constants   = require('../constants/constants'),
    redis       = require('../../../lib/redis'),
    Todos       = require('../models/todos'),
    log         = require('log4js').getLogger(),
    router      = express.Router(),
    appName     = constants.APP_NAME,
    routes      = {},
    KEY_PREFIX  = 'simple:';

routes.index = function (req, res) {

    var userid = req.userid,
        key    = KEY_PREFIX + userid;

    redis.get(key, function (err, data) {

        var initialState = { items: utils.fromJSON(data, []) };
        res.render(appName + '/pages/index', { data: initialState });
    });
};

['addItem', 'removeItem'].forEach(function (funcName) {

    routes[funcName] = function (req, res) {

        var userid = req.userid,
            key    = KEY_PREFIX + userid;

        redis.get(key, function (err, data) {

            log.info('\n' + JSON.stringify({ error: err, data: data }));

            var todos = new Todos(utils.fromJSON(data, []))[funcName](req.body.item),
                items = todos.getItems();

            log.info('\n' + JSON.stringify(items));

            redis.set(key, items, function (err, data) {
                var result = { error: err, data: data, items: items };
                res.json(result);
            });
        });
    };
});

router.get ('/index', routes.index);
router.post('/todo/add', routes.addItem);
router.post('/todo/remove', routes.removeItem);

module.exports = exports = router;
