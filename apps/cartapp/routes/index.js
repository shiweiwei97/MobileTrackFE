/**
 *        Copyright (c) 2015 Yahoo! Inc. All rights reserved.
 */
/* jslint node: true */

"use strict";

var express     = require('express'),
    redis       = require('../../../lib/redis'),
    utils       = require('../../../lib/utils'),
    Cart        = require('../models/cart'),
    constants   = require('../constants/app-constants'),
    log         = require('log4js').getLogger();

var KEY_PREFIX  = "cartItems:",
    routes      = {},
    router      = express.Router(),
    appName     = constants.APP_NAME;

routes.index = function (req, res) {

    var backyardId = req.backyardId,
        key        = KEY_PREFIX + backyardId;

    redis.get(key, function (err, data) {

        var initialState = { items: utils.fromJSON(data, []) };
        res.render(appName + '/pages/main', { data: initialState });
    });
};

['addItem', 'removeItem', 'increaseItem', 'decreaseItem'].forEach(function (funcName) {

    routes[funcName] = function (req, res) {

        var backyardId = req.backyardId,
            key        = KEY_PREFIX + backyardId,
            param      = req.body['addItem' === funcName? 'item': 'index'];

        redis.get(key, function (err, data) {

            log.info('\n' + JSON.stringify({ error: err, data: data }));

            var cart  = new Cart(utils.fromJSON(data, []))[funcName](param),
                items = cart.getItems();

            log.info('\n' + JSON.stringify(items));

            redis.set(key, items, function (err, data) {
                var result = { error: err, data: data, items: items };
                res.json(result);
            });
        });
    };
});

router.get ('/main',           routes.index);
router.post('/cart/add',       routes.addItem);
router.post('/cart/remove',    routes.removeItem);
router.post('/cart/increase',  routes.increaseItem);
router.post('/cart/decrease',  routes.decreaseItem);

module.exports = exports = router;
