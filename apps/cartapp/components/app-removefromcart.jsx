/**
 *        Copyright (c) 2015 Yahoo! Inc. All rights reserved.
 */
/* jslint node: true */
/** @jsx React.DOM */

"use strict";

var React     = require('react'),
    Fluxxor   = require('fluxxor'),
    FluxMixin = Fluxxor.FluxMixin(React);

var RemoveFromCart = React.createClass({

    mixins: [FluxMixin],

    handleClick: function () {
        this.getFlux().actions.removeItem(this.props.index);
    },

    render: function () {
        return <button onClick={this.handleClick}>x</button>;
    }
});

module.exports = RemoveFromCart;