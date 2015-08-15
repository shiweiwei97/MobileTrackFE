/**
 *        Copyright (c) 2015 Yahoo! Inc. All rights reserved.
 */
/* jslint node: true */
/** @jsx React.DOM */

"use strict";

var React     = require('react'),
    Fluxxor   = require('fluxxor'),
    FluxMixin = Fluxxor.FluxMixin(React),
    Cart      = require('./app-cart.jsx'),
    Catalog   = require('./app-catalog.jsx'),
    Layout    = require('../../../components/layout.jsx');

var app = React.createClass({

    mixins: [FluxMixin],

    render: function () {
        return (
            <Layout>
                <h1>Let's Shop</h1>
                <Catalog></Catalog>
                <Cart></Cart>
            </Layout>
        );
    }
});

module.exports = app;