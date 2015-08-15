/**
 *        Copyright (c) 2015 Yahoo! Inc. All rights reserved.
 */
/* jslint node: true */
/** @jsx React.DOM */

"use strict";

var React           = require('react'),
    Fluxxor         = require('fluxxor'),
    FluxMixin       = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin,
    RemoveFromCart  = require('./app-removefromcart.jsx'),
    Increase        = require('./app-increase.jsx'),
    Decrease        = require('./app-decrease.jsx');

var Cart = React.createClass({

    mixins: [FluxMixin, StoreWatchMixin("AppStore")],

    getStateFromFlux: function () {
        var flux = this.getFlux();
        return {
            items: flux.store('AppStore').getState().cartItems
        };
    },

    render: function () {
        var total = 0;
        var items = this.state.items.map(function(item, i) {
            var subtotal = item.cost * item.qty;
            total += subtotal;
            return (
                <tr key={i}>
                    <td><RemoveFromCart index={i} /></td>
                    <td>{item.title}</td>
                    <td>{item.qty}</td>
                    <td>
                        <Increase index={i} />
                        <Decrease index={i} />
                    </td>
                    <td>${subtotal}</td>
                </tr>
            );
        });

        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th>Item</th>
                        <th>Qty</th>
                        <th></th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="4" className="text-right">Total</td>
                        <td>${total}</td>
                    </tr>
                </tfoot>
            </table>
        );
    }
});

module.exports = Cart;