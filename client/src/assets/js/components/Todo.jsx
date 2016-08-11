import React from 'react'

class Todos extends React.Component {

  constructor() {
    super();
    this.state = {
      isEditing: false
    };
  }

  componentWillMount() {
    this.setState({
      description: this.props.todo.description,
      subject: this.props.todo.subject
    })
  }

  render()  {
    return (
      <div className="c-card c-card--higher c-card--primary">
        <div className="c-card__content c-card__content--divider ">{this.props.todo.subject}</div>
        <div className="c-card__content">
          {this.state.isEditing ? this._renderEditing() : this._renderDefault(this.props.todo.description, this.props.todo.status)}
        </div>

      </div>
    )
  }

  _renderEditing() {
    return (
      <div>
        <div>
          <textarea className="c-field" onChange={(e) => this.setState({description: e.target.value})} value={this.state.description || ''}>

          </textarea>
        </div>
        <hr />
        <a className="todo__button--icon" onClick={() => this.save()}>
          <i className="material-icons">save</i>
        </a>


      </div>
    )
  }

  _renderDefault(description, status) {
    return (
      <div>
        <div>
          <span className={(description ? '' : 'todo--no-description')}>
            {description || "No description yet!"}
          </span>
        </div>
        <hr />
        <a className="todo__button--icon" onClick={() => this.setState({isEditing : true })}>
          <i className="material-icons">edit</i>
        </a>
        <a className="todo__button--icon" onClick={() => this.delete()} style={{marginLeft:'6px'}}>
          <i className="material-icons">delete</i>
        </a>
        <div className="pull-right">
          {
            status && status !== 'todo'
            ? <a className="todo__button--icon" onClick={() => this.moveStatusBack(this.props.todo)}>
                <i className="material-icons">arrow_back</i>
              </a>
            : null
          }
          {
            status !== 'done'
            ? <a className="todo__button--icon" onClick={() => this.moveStatusForward(this.props.todo)}>
                <i className="material-icons">arrow_forward</i>
              </a>
            : null
          }
        </div>
      </div>
    )
  }

  save() {
    this.setState({ isEditing : false });
    this.props.onEditTodo(
      this.props.todo.rowId || this.props.todo.id,
      this.state.subject,
      this.state.description,
      this.state.status
    );
  }

  delete() {
    this.props.onDeleteTodo(this.props.todo.rowId || this.props.todo.id)
  }

  moveStatusForward() {
    let newStatus = this.state.status;
    switch (this.props.todo.status) {
      case 'done': throw new Error('this should not happen');
      case 'doing':
        this.setState({ status: 'done' })
        newStatus = 'done';
        break;
      case 'todo':
      default:
        this.setState({ status: 'doing' })
        newStatus = 'doing';
    }

    this.props.onEditTodo(
      this.props.todo.rowId,
      this.state.subject,
      this.state.description,
      newStatus
    );
  }

  moveStatusBack() {
    let newStatus = this.state.status;
    switch (this.props.todo.status) {
      case 'doing':
        this.setState({ status: 'todo' })
        newStatus = 'todo';
        break;
      case 'done':
        this.setState({ status: 'doing' })
        newStatus = 'doing';
        break;
      case 'todo':
      default:
        throw new Error('this should not happen');
    }

    this.props.onEditTodo(
      this.props.todo.rowId || this.props.todo.id,
      this.state.subject,
      this.state.description,
      newStatus
    );
  }
}

export default Todos

