/**
Copyright 2016
William Joel Gardner
**/

/**
EXPRESS CONFIG
**/

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.disable('x-powered-by');


/**
CUSTOM MIDDLEWARE
**/

var middleware = require('./services/middleware');
app.use(middleware.http);


/**
ROUTING
**/

middleware.routes(app);

/**
INIT SERVER
**/

app.listen(process.env.PORT || 9000);
console.log('Baseline App is running.');


/**
HANDLE UNHANDLED ERRORS
**/

process.on('uncaughtException', function(err) {

  // TODO: more robust logging
  console.log('UNHANDLED EXCEPTION IN INDEX.JS: ' + err.stack);

});

process.on('unhandledRejection', function(reason, promise) {

  // TODO: more robust logging
  console.log('UNHANDLED REJECTION IN INDEX.JS: ' + reason.stack);

});


/**
PROXY TO WEBPACK DEV SERVER:

In a local dev environment, rather than waiting the 7-8 seconds
for a fresh webpack build, you can run a webpack dev server via:
$ node webpack-dev-server.js

Then, proxy to the webpack-dev-server (see below).
Note, NODE_ENV env variable must be 'development', i.e.:
$ NODE_ENV=development node index.js
**/

if (process.env.NODE_ENV !== 'development')
    return;

var proxy = require('express-http-proxy');
console.log('Proxying to webpack dev-server.');
app.use('/', proxy('localhost:9002/', {
  forwardPath: function(req, res) {
    return require('url').parse(req.url).path;
  }
}));


// can't seem to get this working quite right (bad gateway errors)
// but hitting postgraphql from the browser seems fine
console.log('Proxying /graphql to port 3000');
app.use('/graphql', proxy('localhost:3000/', {
  forwardPath: function(req, res) {
    return '/';
  }
}));
