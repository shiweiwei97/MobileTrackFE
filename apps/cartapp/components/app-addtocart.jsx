/**
 *        Copyright (c) 2015 Yahoo! Inc. All rights reserved.
 */
/* jslint node: true */
/** @jsx React.DOM */

"use strict";

var React     = require('react'),
    Fluxxor   = require('fluxxor'),
    FluxMixin = Fluxxor.FluxMixin(React);

var AddToCart = React.createClass({

    mixins: [FluxMixin],

    handleClick: function () {
        this.getFlux().actions.addItem(this.props.item);
    },

    render: function () {
        return <button onClick={this.handleClick}>Add To cart</button>;
    }
});

module.exports = AddToCart;