import React from 'react'
import './List.scss'

class List extends React.Component {
  render() {
    return(
      <React.Fragment>
        <div>
          {this.props.allTodo && this.props.allTodo.map((elm, index) => {
            return(
              <div>
                <span><input type="radio" id={elm.id} onClick={() => this.props.markAsCompleted}/></span>
                <span>{elm.inputValue}</span>
                <span onClick={() => this.props.deleteListElement(elm)}>X</span>
              </div>
            )
          })}
        </div>
      </React.Fragment>
    )
  }
}
export default List;