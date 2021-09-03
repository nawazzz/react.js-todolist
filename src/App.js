import logo from './logo.svg';
import './App.scss';
import reactDom from 'react-dom';
import React from 'react';
import List from './List'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      allTodo: []
    }
  }
  hanldeChange = (e) => {
      this.setState({
        value: e.target.value
      })
  }
  handleSubmit = (e) => {
    // console.log(e)
    let obj = {
      inputValue: this.state.value,
      isCompleted: false,
      id: new Date().getTime()
    }
    if (this.state.value.length > 0) {
      this.state.allTodo.push(obj)
    }
    this.setState({
      value: ""
    }, () => {
      // console.log(this.state)
    })
  }
  deleteListElement = (elm) => {
    const filteredAlltodo = this.state.allTodo.filter((item, index) => {
      if (elm.id !== item.id) {
        return true
      }
    })
    this.setState({
      allTodo: filteredAlltodo
    })
  }
  markAsCompleted = (elm) => {
    const strikeThrough = this.state.allTodo.map((item, index) => {
      if (elm.id === item.id) {
        return {
          ...item,
          isCompleted: !item.isCompleted
        }
      }
      return item
    })
    this.setState({
      allTodo: strikeThrough
    }, () => {
      console.log(this.state.allTodo)
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="App">
          <h1>todos</h1>
          <input type="text" placeholder="What needs to be done?" value={this.state.value} onChange={this.hanldeChange}/>
          <input type="submit" onClick={this.handleSubmit}/>
        </div>
        <List allTodo={this.state.allTodo} deleteListElement={this.deleteListElement} markAsCompleted={this.markAsCompleted}
        />
      </React.Fragment>
    );
  }
}

export default App;
