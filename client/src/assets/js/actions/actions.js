import Http from '../util/http'

//
/// Synchronous action creators
//

export const DID_ADD_TODO = 'DID_ADD_TODO'
export function didAddTodo(todo) {
	return { type : DID_ADD_TODO, todo : todo };
}

export const DID_FETCH_TODOS = 'DID_FETCH_TODOS'
export function didFetchTodos(todos) {
	return { type : DID_FETCH_TODOS, todos: todos }
}

export const DID_EDIT_TODO = 'DID_EDIT_TODO'
export function didEditTodo(todo) {
  return { type : DID_EDIT_TODO, id: todo.id, todo : todo };
}

export const DID_DELETE_TODO = 'DID_DELETE_TODO'
export function didDeleteTodo(id) {
  return { type : DID_DELETE_TODO, id: id };
}

//
/// thunks (async)
//

export function fetchTodos(email, password) {
	const query = `{
  todoNodes {
    nodes {
      rowId
      subject
      description
      updatedat
      status
      createdat
    }
  }
}`;
	return function(dispatch) {
		return Http.graphql(query)
			.then(res => {
        res.data.todoNodes.nodes.forEach(n => { n.status && (n.status = n.status.toLowerCase())})
        dispatch(didFetchTodos(res.data.todoNodes.nodes));
			});
	}
}

export function addTodo(subject, description, status) {
  const route = '/api/todos'
  return function(dispatch) {
    return Http.post(route, { subject, description, status })
      .then(todo => {
        dispatch(didAddTodo(todo));
      });
  }
}

export function editTodo(id, subject, description, status) {
  const route = '/api/todos/' + id;
  return function(dispatch) {
    return Http.put(route, { subject, description, status})
      .then(todo => {
        dispatch(didEditTodo(todo));
      });
  }
}

export function deleteTodo(id) {
  const route = '/api/todos/' + id;
  return function(dispatch) {
    return Http.del(route)
      .then(res => {
        dispatch(didDeleteTodo(id));
      });
  }
}
