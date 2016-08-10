import React from 'react'
import ReactDOM from 'react-dom'

//import { connect } from 'react-redux'

class Todos extends React.Component {

  constructor() {
    super();
    this.state = {
      searchText: ''
    };

    this.timeout = null;
  }

  componentWillMount() {
    this.setState({ searchText: this.props.filterText })
  }

  render()  {
    console.log(this.props.todos);
    return (
      <div>
        <div className="o-container o-container--medium">
          <div className="c-input-group">
            <input className="c-field" placeholder="Enter a new todo..." type="text" />
            <button className="c-button c-button--primary">Add Todo</button>
          </div>
        </div>
        <div className="o-container o-container--large o-grid">
          <div className="o-grid__cell o-grido-panel-container">
            <h4>TODO</h4>
            {this.props.todos.map(todo => (
              <div className="c-card c-card--higher c-card--primary">
                <div className="c-card__content c-card__content--divider">{todo.subject}</div>
                <div className="c-card__content">
                  <p className="c-paragraph">{todo.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="o-grid__cell o-grido-panel-container">
            <h4>DOING</h4>
          </div>
          <div className="o-grid__cell o-grido-panel-container">
            <h4>DONE</h4>
          </div>
        </div>
      </div>
    )
  }

  clearFilter() {
    this.filterAddresses('');
    const e = ReactDOM.findDOMNode(this.refs.filterInput);
    e.value = '';
  }

  debounce(fn, ms) {

    // clear any currently active timeout
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }

    // and set a new one
    this.timeout = setTimeout(() => {
      fn.call(this);
      this.timeout = null;
    }, ms);
  }
}

export default Todos

