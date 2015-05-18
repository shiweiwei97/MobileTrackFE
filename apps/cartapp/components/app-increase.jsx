/* jslint node: true */
/** @jsx React.DOM */

"use strict";

var React     = require('react'),
    Fluxxor   = require('fluxxor'),
    FluxMixin = Fluxxor.FluxMixin(React);

var Increase = React.createClass({

    mixins: [FluxMixin],

    handleClick: function () {
        this.getFlux().actions.increaseItem(this.props.index);
    },

    render: function () {
        return <button onClick={this.handleClick}>+</button>;
    }
});

module.exports = Increase;