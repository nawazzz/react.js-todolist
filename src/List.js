import React from 'react'
import './List.scss'

class List extends React.Component {
  render() {
    return(
      <React.Fragment>
        <div>
          {this.props.allTodo && this.props.allTodo.map((elm, index) => {
            return(
              <div key={elm.id} className="todosContainer">
                <span className="checkbox"><input className="inputCheckbox" type="checkbox" checked={elm.isCompleted} value={elm.isCompleted} id={elm.id} onClick={() => this.props.markAsCompleted(elm)}/></span>
                <span onClick={() => this.props.editListThroughModal(elm)} style={{textDecoration: elm.isCompleted? "line-through" : "none" }}className="todoTextListElement" >{elm.inputValue}</span>
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