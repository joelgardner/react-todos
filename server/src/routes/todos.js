var Todos = require('../data/models/todo');
var utils = require('../services/utils'),
  _ = utils._;

// the routes defined here will be appended to '/auth'
exports.routes = {

  /**
  POST requests
  **/
  post : {

    '/api/todos' : function(req, res, next) {
      _.promisifyValue(Todos.parse(req.body))
      .then(parsed => Todos.create(parsed))
      .then(todo => res.send(todo))
      .catch(res.sendError);
    }

  },

  /**
  PUT requests
  **/
  put : {

    '/api/todos/:id' : function(req, res, next) {
      _.promisifyValue(Todos.parse(req.body))
      .then(parsed => Todos.edit(req.params.id, parsed))
      .then(todo => res.send(todo))
      .catch(res.sendError);
    }

  },

  /**
  DELETE requests
  **/

  delete: {
    '/api/todos/:id' : function(req, res, next) {
      Todos.deleteById(req.params.id)
      .then(() => res.status(200).end())
    }
  }
};
