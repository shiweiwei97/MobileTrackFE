/* jslint node: true */
/** @jsx React.DOM */

"use strict";

var React     = require('react'),
    Fluxxor   = require('fluxxor'),
    FluxMixin = Fluxxor.FluxMixin(React),
    Header    = require('./header.jsx'),
    Footer    = require('./footer.jsx');

var Layout = React.createClass({

    mixins: [FluxMixin],

    render: function () {
        return (
            <div>
                <Header />
                <div>{this.props.children}</div>
                <Footer />
            </div>
        );
    }
});

module.exports = Layout;