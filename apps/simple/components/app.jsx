/* jslint node: true */
/** @jsx React.DOM */

"use strict";

var React       = require('react'),
    Fluxxor     = require('fluxxor'),
    FluxMixin   = Fluxxor.FluxMixin(React),
    Input       = require('./input.jsx'),
    Todolist    = require('./todolist.jsx'),
    Layout      = require('../../../components/layout.jsx');

var App = React.createClass({

    mixins: [ FluxMixin ],

    render: function () {
        return (
            <Layout>
                <Input />
                <Todolist />
            </Layout>
        );
    }
});

module.exports = App;
