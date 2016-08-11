
/**
Http custom middleware adds two methods to the response object that are heavily used by the routing logic:
(a) sendError is used to send validation errors or exceptions
(b) sendJson is used to send API responses
**/
exports.http = function(req, res, next) {

  res.sendError = function _sendError (error) {
    // /**
    // the error "framework" adds a length property to indicate the number of errors,
    // at this point we can delete it, since we know we have an error
    // **/
    // delete error.length;
    // delete error.hasErrors;
    console.log('ERROR: ' + error);
    // send back a 400 with a JSON object of error descriptions
    res.status(400).json({ error: error });
  };

  res.sendJson = function _sendJson(payload) {
    return function(/* ignored output from promise chain */) {
      res.json(payload);
    };
  };

  next();
};


/**
Takes an Express app and an authentication handler (which for now is PassportJWT).
**/
exports.routes = function(app) {
  var todos = require('../routes/todos');
  [
    /**
    Add route modules here
    **/
    todos.routes
  ].forEach(function(routeModule) {
    ['get', 'post', 'put', 'delete', 'patch'].forEach(function(httpMethod) {
      if (!routeModule[httpMethod]) return;
      Object.keys(routeModule[httpMethod]).forEach(function(route) {
        app[httpMethod](route, routeModule[httpMethod][route]);
      });
    });
  });
}

