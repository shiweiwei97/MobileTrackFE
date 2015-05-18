/* jslint node: true */

"use strict";

var gulp       = require('gulp'),
    browserify = require('browserify'),
    reactify   = require('reactify'),
    uglify     = require('gulp-uglify'),
    streamify  = require('gulp-streamify'),
    source     = require("vinyl-source-stream"),
    gulputil   = require('gulp-util'),
    watchify   = require('watchify'),
    duration   = require('gulp-duration'),
    gulpif     = require('gulp-if'),
    server     = require('gulp-develop-server'),
    path       = require('path'),
    appConfig  = require('./lib/config'),
    utils      = require('./lib/utils');

var configFile = path.join(__dirname, './app.yml'),
    config     = new appConfig(configFile).getConfig(),
    appsDir    = config.appsDir,
    filterFunc = function (file) {
        return path.extname(file) === '.jsx' && path.basename(path.dirname(file)) === 'pages';
    },
    mapFunc    = function (res) {
        return res.replace(/^apps\/(.*)\.jsx$/g, '$1');
    },
    pages      = utils.walk(appsDir,filterFunc, mapFunc),
    tasks      = pages.map(function (page) { return 'build:' + page; }),
    prod       = false;

gulputil.log('pages found: ' + JSON.stringify(pages));

pages.forEach(function (page) {

    var src  = appsDir + '/' + page + '.js',
        dest = './js/' + page.replace('\/pages', '') + '.js',
        b    = browserify({
            debug: true,
            insertGlobals: true,
            standalone: 'main',
            cache: {},
            packageCache: {},
            fullPaths: true
        });

    // watch code changes in dev mode
    if (!prod) {
        b = watchify(b, watchify.args);
        b.on('update', bundle);
    }

    b.transform(reactify);
    b.add(src);

    function bundle() {

        gulputil.log('start rebuilding...');

        return b.bundle()
            .on('error', gulputil.log.bind(gulputil, 'Browserify Error'))
            .on('bundle', function (bundle) {})
            .on('transform', function (tr, file) {})
            .pipe(source(dest))
            .pipe(duration('rebuild duration'))
            .pipe(gulpif(prod, streamify(uglify())))
            .pipe(gulp.dest('./public/'));
    }

    gulp.task('build:' + page, bundle);
});

gulp.task('server', function() {
    // run server
    server.listen({ path: './app.js' });

    // restart server on file changes
    var paths = [
        './app.js',
        './lib/**/*',
        './middleware/**/*',
        './models/**/*',
        './routes/**/*',
        './components/**/*',
        './apps/**/*'
    ];
    gulp.watch(paths, server.restart);
});

gulp.task('enable-prod', function () { prod = true; });
gulp.task('prod', ['enable-prod'].concat(tasks), function() { process.exit(0); });
gulp.task('default', tasks.concat('server'));
