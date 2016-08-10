import React from 'react'
import Todos from './Todos.jsx'
import { connect } from 'react-redux'
import {
  addTodo
} from '../actions/actions'

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddTodo: (todo) =>
      dispatch(addTodo(todo)),
  }
}

const TodosContainer = connect(mapStateToProps, mapDispatchToProps)(Todos)

export default TodosContainer
