/* jslint node: true */
/** @jsx React.DOM */

var React       = require('react'),
    Fluxxor     = require('fluxxor'),
    path        = require('path'),
    AppStore    = require('../stores/app-store'),
    actions     = require('../actions/app-actions'),
    App         = require('../components/app.jsx'),
    constants   = require('../constants/app-constants');

var scriptName = path.basename(__filename).replace('jsx', 'js'),
    scriptPath = ['/js', constants.APP_NAME, scriptName].join('/');

module.exports = React.createClass({

    render: function () {

        var appStore = new AppStore(),
            stores   = { AppStore: appStore },
            flux     = new Fluxxor.Flux(stores, actions),
            data     = this.props.data;

        // initialize cart items
        appStore.setCartItems(data.items);

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
