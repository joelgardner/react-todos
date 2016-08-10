import { combineReducers } from 'redux'
import {
	DID_ADD_TODO,
  DID_FETCH_TODOS
} from "../actions/actions";


/**
TODOS STATE
**/

function todos(state = [], action) {
  let newState;
	switch (action.type) {
		case DID_ADD_TODO:
      newState = state.slice();
      newState.unshift(todo);
			return newState;
    case DID_FETCH_TODOS:
      return action.todos;
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
