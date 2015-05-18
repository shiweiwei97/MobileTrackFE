/* jslint node: true */
/** @jsx React.DOM */

"use strict";

var React           = require('react'),
    Fluxxor         = require('fluxxor'),
    FluxMixin       = Fluxxor.FluxMixin(React);

var Input = React.createClass({

    mixins: [ FluxMixin ],

    handleClick: function () {
        var text = this.refs.text.getDOMNode().value.trim();
        this.getFlux().actions.addItem(text);
        this.refs.text.getDOMNode().value = '';
    },

    render: function () {
        return (
            <div className="row">
                <div className="col-lg-3">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="input something..." ref="text" />
                        <span className="input-group-btn">
                            <button type="button" className="btn btn-default" onClick={this.handleClick}>Add</button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Input;
