/**
 *        Copyright (c) 2015 Yahoo! Inc. All rights reserved.
 */
/* jslint node: true */

"use strict";

var Fluxxor      = require('fluxxor'),
    constants    = require('../constants/app-constants'),
    Catalog      = require('../models/catalog'),
    Cart         = require('../models/cart'),
    CHANGE_EVENT = "change";

var catalog = new Catalog(),
    cart    = new Cart();

var AppStore = Fluxxor.createStore({

    initialize: function () {
        this.bindActions(
            constants.ADD_ITEM, this.onAddItem,
            constants.REMOVE_ITEM, this.onRemoveItem,
            constants.INCREASE_ITEM, this.onIncreaseItem,
            constants.DECREASE_ITEM, this.onDecreaseItem
        );
    },

    onAddItem: function (action) {
        cart.addItem(action.item);
        this.emit(CHANGE_EVENT);
    },

    onRemoveItem: function (action) {
        cart.removeItem(action.index);
        this.emit(CHANGE_EVENT);
    },

    onIncreaseItem: function (action) {
        cart.increaseItem(action.index);
        this.emit(CHANGE_EVENT);
    },

    onDecreaseItem: function (action) {
        cart.decreaseItem(action.index);
        this.emit(CHANGE_EVENT);
    },

    getState: function () {
        return {
            catalog: catalog.getCatalog(),
            cartItems: cart.getItems()
        };
    },

    setCartItems: function (items) {
        cart.resetItems(items);
        this.emit(CHANGE_EVENT);
    }
});

module.exports = AppStore;
