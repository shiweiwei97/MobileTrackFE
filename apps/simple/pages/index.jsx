/* jslint node: true */
/** @jsx React.DOM */

var React = require('react'),
    path = require('path'),
    Fluxxor = require('fluxxor'),
    TodoStore = require('../stores/todostore'),
    App = require('../components/app.jsx'),
    actions = require('../actions/actions'),
    constants = require('../constants/constants');

var scriptName = path.basename(__filename).replace('jsx', 'js'),
    scriptPath = ['/js', constants.APP_NAME, scriptName].join('/');

module.exports = React.createClass({

    render: function () {

        var todostore = new TodoStore();
        var stores = {
                TodoStore: todostore
            };
        var flux = new Fluxxor.Flux(stores, actions);
        var data = this.props.data;

        // initialize store data here
        todostore.setTodoItems(data.items);

        // render the content as a dynamic react component
        var contentHtml = React.renderToString(<App flux={flux} {...data}/>),
            initScript  = 'main(' + JSON.stringify(data).replace(/script/g, 'scr"+"ipt') + ')';

        return (
            <html lang="en">
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <link rel="stylesheet" href="/css/bootstrap.min.css"/>
                </head>
                <body>
                    <div id="main" dangerouslySetInnerHTML={{__html: contentHtml}}/>

                    <script src={scriptPath}></script>
                    <script dangerouslySetInnerHTML={{__html: initScript}} />
                </body>
            </html>
        );
    }
});
