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
      <div className='todos-list'>

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

