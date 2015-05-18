/* jslint node: true */

var express         = require('express');
var path            = require('path');
var fs              = require('fs');
var _               = require('lodash');
var reactViews      = require('express-react-views');
var bodyParser      = require('body-parser');
var multer          = require('multer');
var cookieParser    = require('cookie-parser');
var bouncer         = require('./middleware/bouncer');
var routes          = require('./routes');
var appConfig       = require('./lib/config');

var app             = express(),
    configFile      = path.join(__dirname, 'app.yml'),
    config          = new appConfig(configFile).getConfig();

// view engine
app.set('view engine', 'jsx');
app.engine('jsx', reactViews.createEngine({}));
app.set('views', config.appsDir);

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(cookieParser());
app.use(express.static(__dirname + '/public', {
        setHeaders: function (res) {
            res.set('X-No-Bouncer', true);
        }
    })
);
app.use(bouncer());

// routes
app.get ('/', routes.index);

// load apps routers
var appsDir = path.join(__dirname, config.appsDir || 'apps');
var apps = fs.readdirSync(appsDir).filter(function(file) {
    return fs.statSync(path.join(appsDir, file)).isDirectory();
});

// load app routes and static resources
_.each(apps, function (appName) {
    app.use('/' + appName, require('./apps/' + appName + '/routes'));
    app.use('/public/' + appName, express.static(__dirname + '/apps/' + appName + '/public'));
});

// start the app
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Server started, listening on port ' + port);
});
