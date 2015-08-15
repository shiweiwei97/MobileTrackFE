/**
 *        Copyright (c) 2015 Yahoo! Inc. All rights reserved.
 */
/* jslint node: true */

"use strict";

var $         = require('jquery'),
    constants = require('../constants/app-constants'),
    appName   = constants.APP_NAME;

function asyncDispatch (url, data, action, context) {

    var str = typeof data === 'string'? str: JSON.stringify(data);

    $.ajax({
        url : ['/', appName, url].join(''),
        type: "post",
        data: str,
        dataType: "json",
        contentType: "application/json",
        success: $.proxy(function () {
            this.dispatch(action, data);
        }, context)
    });
}

var actions = {

    addItem: function (item) {
        asyncDispatch('/cart/add', { item: item }, constants.ADD_ITEM, this);
    },

    removeItem: function (index) {
        asyncDispatch('/cart/remove', { index: index }, constants.REMOVE_ITEM, this);
    },

    decreaseItem: function (index) {
        asyncDispatch('/cart/decrease', { index: index }, constants.DECREASE_ITEM, this);
    },

    increaseItem: function (index) {
        asyncDispatch('/cart/increase', { index: index }, constants.INCREASE_ITEM, this);
    }
};

module.exports = actions;
