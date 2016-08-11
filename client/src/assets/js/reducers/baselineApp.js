import { combineReducers } from 'redux'
import {
	DID_ADD_TODO,
  DID_FETCH_TODOS,
  DID_EDIT_TODO,
  DID_DELETE_TODO
} from "../actions/actions";


/**
TODOS STATE
**/

function todos(state = [], action) {
  let newState, i;
	switch (action.type) {
		case DID_ADD_TODO:
      newState = state.slice();
      newState.unshift(action.todo);
			return newState;
    case DID_FETCH_TODOS:
      return action.todos;
    case DID_EDIT_TODO:
      newState = state.slice();
      i = newState.reduce((result, todo, i) => {
        return (todo.rowId || todo.id) ==/*=*/ action.id ? i : result
      }, -1);
      newState[i] = Object.assign(newState[i], action.todo);
      return newState;
    case DID_DELETE_TODO:
      newState = state.slice();
      i = newState.reduce((result, todo, i) => {
        return (todo.rowId || todo.id) ==/*=*/ action.id ? i : result
      }, -1);
      return newState.slice(0, i).concat(newState.slice(i + 1));
		default:
			return state;
	}
}

/**
ROOT APPLICATION STATE
**/

const baselineApp = combineReducers({
	todos
})

export default baselineApp
