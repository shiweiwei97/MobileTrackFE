/* jslint node: true */
/** @jsx React.DOM */

"use strict";

var React     = require('react'),
    Fluxxor   = require('fluxxor'),
    FluxMixin = Fluxxor.FluxMixin(React);

var Footer = React.createClass({

    mixins: [FluxMixin],

    render: function () {
        return <h1>This is footer</h1>;
    }
});

module.exports = Footer;