/**
 *        Copyright (c) 2015 Yahoo! Inc. All rights reserved.
 */
/* jslint node: true */
/* global document, window */
/** @jsx React.DOM */

var React    = require('react'),
    Fluxxor  = require('fluxxor'),
    AppStore = require('../stores/app-store'),
    actions  = require('../actions/app-actions'),
    App      = require('../components/app.jsx');

module.exports = function (data) {
    var appStore = new AppStore(),
        stores   = { AppStore: appStore },
        flux     = new Fluxxor.Flux(stores, actions);

    // initialize cart items
    appStore.setCartItems(data.items);

    window.flux = flux;

    React.render(<App flux={flux} {...data} />, document.getElementById('main'));
};
