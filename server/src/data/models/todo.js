var db = require('../db'),
  bookshelf = db.bookshelf,
  handleDatabaseException = db.handleDatabaseException;
var utils = require('../../services/utils'),
  Dates = utils.Dates,
  Security = utils.Security,
  Validation = utils.Validation,
  _ = utils._;

/**
  * Todos
  */

var Todo =
exports.Model = bookshelf.Model.extend({
  tableName: 'todos.todo'
});

exports.fetchAll = () => {
  return Todo.fetchAll();
};

exports.create = (item) => {
  return Todo.forge(item).save();
}

exports.edit = (todoId, todo) => {
  return new Todo({ id: todoId }).save(todo, { patch: true });
}

exports.deleteById = (id) => {
  return new Todo({ id : id }).destroy();
}

exports.parse = obj => _.parse(obj, [
  'subject',
  'description',
  'status'
]);

exports.validateSignup = todo => Validation.validate([
  Validation.v('subject',     Validation.isNonempty(todo.subject),    'Todo subject is required.'),
  Validation.v('status',      Validation.isOneOf(todo.status, ['todo', 'doing', 'done']), 'Invalid status.')
]);
