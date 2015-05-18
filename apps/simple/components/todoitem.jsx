/* jslint node: true */
/** @jsx React.DOM */

"use strict";

var React           = require('react'),
    Fluxxor         = require('fluxxor'),
    FluxMixin       = Fluxxor.FluxMixin(React);

var TodoItem = React.createClass({

    mixins: [ FluxMixin ],

    handleClick: function () {
        this.getFlux().actions.removeItem(this.props.index);
    },

    render: function () {

        return (
            <li className="list-group-item">
                <div className="input-group">
                    <span>{this.props.text}</span>
                    <span className="input-group-btn">
                        <button type="button" className="btn btn-default" onClick={this.handleClick}>Remove</button>
                    </span>
                </div>
            </li>
        );
    }
});

module.exports = TodoItem;
