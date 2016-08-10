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
      createdat
    }
  }
}`;
	return function(dispatch) {
		return Http.graphql(query)
			.then(res => {
        dispatch(didFetchTodos(res.data.todoNodes.nodes));
			});
	}
}

export function addTodo(subject, description, status) {
  const route = '/api/todos'
  return function(dispatch) {
    return Http.post(route, { subject, description, status })
      .then(res => {
        debugger;
        dispatch(didAddTodo(res.todo));
      });
  }
}

