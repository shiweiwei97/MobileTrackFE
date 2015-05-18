/* jslint node: true */

"use strict";

function Todos (initialItems) {

    var _todos = initialItems || [];

    this.addItem = function (item) {
        _todos.push(item);
        return this;
    };

    this.removeItem = function (index) {
        _todos.splice(index, 1);
        return this;
    };

    this.resetItems = function (items) {
        _todos = items;
        return this;
    };

    this.getItems = function () {
        return _todos;
    };
}

module.exports = Todos;