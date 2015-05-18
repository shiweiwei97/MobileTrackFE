/* jslint node: true */

"use strict";

var $         = require('jquery'),
    constants = require('../constants/constants'),
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
        asyncDispatch('/todo/add', { item: item }, constants.ADDITEM, this);
    },

    removeItem: function (item) {
        asyncDispatch('/todo/remove', { item: item }, constants.REMOVEITEM, this);
    }

};
module.exports = actions;
