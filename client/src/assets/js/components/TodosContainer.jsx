import React from 'react'
import Todos from './Todos.jsx'
import { connect } from 'react-redux'
import {
  addTodo,
  editTodo,
  deleteTodo
} from '../actions/actions'

const mapStateToProps = (state) => {
  return {
    todos_todo: state.todos.filter(t => !t.status || t.status === 'todo'),
    todos_doing: state.todos.filter(t => t.status === 'doing'),
    todos_done: state.todos.filter(t => t.status === 'done')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddTodo: (subject) =>
      dispatch(addTodo(subject)),
    onEditTodo: (id, subject, description, status) =>
      dispatch(editTodo(id, subject, description, status)),
    onDeleteTodo: (id) =>
      dispatch(deleteTodo(id))
  }
}

const TodosContainer = connect(mapStateToProps, mapDispatchToProps)(Todos)

export default TodosContainer
