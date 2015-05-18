/* jslint node: true */
/* global document, window */
/** @jsx React.DOM */

var React = require('react'),
    Fluxxor = require('fluxxor'),
    TodoStore = require('../stores/todostore'),
    App = require('../components/app.jsx'),
    actions = require('../actions/actions');

module.exports = function (data) {

    var todostore = new TodoStore();
    var stores = {
            TodoStore: todostore
        };
    var flux = new Fluxxor.Flux(stores, actions);

    // initialize store data here
    todostore.setTodoItems(data.items);

    window.flux = flux;
    React.render(<App flux={flux} {...data} />, document.getElementById('main'));
};
