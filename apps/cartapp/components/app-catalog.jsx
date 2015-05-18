/* jslint node: true */
/** @jsx React.DOM */

"use strict";

var React           = require('react'),
    Fluxxor         = require('fluxxor'),
    FluxMixin       = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin,
    AddToCart       = require('./app-addtocart.jsx');

var Catalog = React.createClass({

    mixins: [FluxMixin, StoreWatchMixin("AppStore")],

    getStateFromFlux: function () {
        var flux = this.getFlux();
        return {
            items: flux.store('AppStore').getState().catalog
        };
    },

    render: function () {
        var items = this.state.items.map(function(item) {
            return <tr key={item.id}><td>{item.title}</td><td>${item.cost}</td><td><AddToCart item={item} /></td></tr>;
        });

        return (
            <table className="table table-hover">{items}</table>
        );
    }
});

module.exports = Catalog;