/* jslint node: true */
/** @jsx React.DOM */

"use strict";

var React           = require('react'),
    Fluxxor         = require('fluxxor'),
    StoreWatchMixin = Fluxxor.StoreWatchMixin,
    FluxMixin       = Fluxxor.FluxMixin(React),
    TodoItem        = require('./todoitem.jsx');

var TodoList = React.createClass({

    mixins: [ FluxMixin, StoreWatchMixin("TodoStore") ],

    getStateFromFlux: function () {

        var flux = this.getFlux();
        return {
            TodoStore: flux.store('TodoStore').getState()
        };
    },

    render: function () {

        var items = this.state.TodoStore.map(function(item, i) {
            return <TodoItem key={i} index={i} text={item} />;
        });

        return (
            <div className="row">
                <div className="col-lg-3">
                    <ul className="list-group">{items}</ul>
                </div>
            </div>
        );
    }
});

module.exports = TodoList;
