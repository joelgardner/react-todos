import React from 'react'
import ReactDOM from 'react-dom'
import Todo from './Todo.jsx'

//import { connect } from 'react-redux'

class Todos extends React.Component {

  constructor() {
    super();
    this.state = {
      todoSubjectText: ''
    };
  }


  render()  {
    return (
      <div>
        <div className="o-container o-container--medium">
          <div className="c-input-group">
            <input className="c-field" placeholder="Enter a new todo..." value={this.state.todoSubjectText} onKeyUp={(e) => this.handleKeyUp(e)} onChange={(e) => this.setState({ todoSubjectText: e.target.value })} type="text" />
            <button className="c-button c-button--primary" onClick={e => this.props.onAddTodo(this.state.todoSubjectText)}>Add Todo</button>
          </div>
        </div>
        <div className="o-container o-container--large o-grid">
          <div className="o-grid__cell o-grido-panel-container">
            <h4>TODO</h4>
            {this.props.todos_todo.map((todo, i) => (
              <Todo todo={todo} onEditTodo={this.props.onEditTodo} onDeleteTodo={this.props.onDeleteTodo} key={i} />
            ))}
          </div>
          <div className="o-grid__cell o-grido-panel-container">
            <h4>DOING</h4>
            {this.props.todos_doing.map((todo, i) => (
              <Todo todo={todo} onEditTodo={this.props.onEditTodo} onDeleteTodo={this.props.onDeleteTodo} key={i} />
            ))}
          </div>
          <div className="o-grid__cell o-grido-panel-container">
            <h4>DONE</h4>
            {this.props.todos_done.map((todo, i) => (
              <Todo todo={todo} onEditTodo={this.props.onEditTodo} onDeleteTodo={this.props.onDeleteTodo} key={i} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  handleKeyUp(e) {
    if (e.keyCode !== 13) return;


    this.props.onAddTodo(this.state.todoSubjectText);
    this.setState({ todoSubjectText: '' });


  }

}

export default Todos

