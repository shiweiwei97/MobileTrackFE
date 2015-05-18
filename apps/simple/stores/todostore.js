/* jslint node: true */

"use strict";

var Fluxxor      = require('fluxxor'),
    constants    = require('../constants/constants'),
    Todos        = require('../models/todos'),
    CHANGE_EVENT = "change";

var todos = new Todos();

var TodoStore = Fluxxor.createStore({

    initialize: function () {

        this.bindActions(
            constants.ADDITEM, this.onAddItem,
            constants.REMOVEITEM, this.onRemoveItem
        );
    },

    onAddItem: function (action) {
        todos.addItem(action.item);
        this.emit(CHANGE_EVENT);
    },

    onRemoveItem: function (action) {
        todos.removeItem(action.item);
        this.emit(CHANGE_EVENT);
    },

    getState: function () {
        return todos.getItems();
    },

    setTodoItems: function (items) {
        todos.resetItems(items);
        this.emit(CHANGE_EVENT);
    }
});

module.exports = TodoStore;
