import logo from './logo.svg';
import './App.scss';
import reactDom from 'react-dom';
import React from 'react';
import List from './List'
// import CustomModal from './Modal'
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      allTodo: [],
      selectedFilter: "All",
      isEditModalOpen: false,
      editTodoWithThisId: "",
      editText: ""
    }
  }
  hanldeChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }
  handleSubmit = (e) => {
    console.log(e)
    let obj = {
      inputValue: this.state.value,
      isCompleted: false,
      id: new Date().getTime()
    }
    if (e.charCode === 13 && this.state.value.length > 0) {
      this.setState({
        allTodo: [
          ...this.state.allTodo,
          obj
        ],
        value: ""
      })
    }
    
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
    })
  }
  handleFilter = (e) => {
    // console.log(e.target.dataset.name)
    this.setState({
      selectedFilter: e.target.dataset.name
    })
  }
  handleModalClose = () => {
    this.setState({
      isEditModalOpen: false
    })
  }
  
  editListThroughModal = (elm) => {
    this.setState({
      editTodoWithThisId: elm.id,
      isEditModalOpen: true,
      editText: elm.inputValue
    })
  }
  handleEdit = (e) => {
    this.setState({
      editText: e.target.value
    })
  }

  handleEditedTodo = (e) => {
    const todoModalText = this.state.allTodo.map((elm, index) => {
      if (elm.id === this.state.editTodoWithThisId) {
        return {...elm,
          inputValue: this.state.editText
        }
      }
      return elm
    })
    this.setState({
      allTodo: todoModalText,
      isEditModalOpen: false,
      editText: ""
    })
  }

  render() {

    let filteredTodo = []
    if (this.state.selectedFilter === "Active") {
      filteredTodo = this.state.allTodo.filter((elm, index) => {
        if (elm.isCompleted === false) {
          return true
        }
      })
    }
    if (this.state.selectedFilter === "Completed") {
      filteredTodo = this.state.allTodo.filter((elm, index) => {
        if (elm.isCompleted === true) {
          return true
        }
      })
    }
if (this.state.allTodo.length > 0) {
  return (
    
    <React.Fragment>
      <Modal
        isOpen={this.state.isEditModalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={this.handleModalClose}
        style={customStyles}
        contentLabel="Example Modal"
        editTodoWithThisId={this.state.editTodoWithThisId}
        handleEdit={this.handleEdit}
      >
        <h2 className="editTodoInModal">Edit your todo:</h2>
        {/* <button onClick={this.handleModalClose}>close</button> */}
        <div>
          <input type={"text"} value={this.state.editText} onChange={this.handleEdit} className="inputTextModal" />
        </div>
        <div>
        <input type="submit" onClick={this.handleEditedTodo} className="submitButtonModal"/>
        </div>
      </Modal>
      <div className="App">
        <h1>todos</h1>
        <div className="inputContainer">
          {/* <span ><select className="selectAllTodo"></select></span> */}
          <input type="text" placeholder="What needs to be done?" value={this.state.value} onChange={this.hanldeChange} className="inputText" onKeyPress={this.handleSubmit}
          />
          {/* <input type="submit" onClick={this.handleSubmit} className="submitButton"/> */}
        </div>
      </div>
      <List allTodo={this.state.selectedFilter === "All" ? this.state.allTodo : filteredTodo} deleteListElement={this.deleteListElement} markAsCompleted={this.markAsCompleted} editListThroughModal={this.editListThroughModal}
      />
      <div onClick={this.handleFilter} className="todoFilterContainer">
        {/* <div>
          <span>
          {this.state.allTodo.length} items left
          </span>
        </div> */}
        <div className="allFilters">
          <span className="allTodoFilter" data-name={'All'}>
            All 
          </span>
          <span className="activeTodoFilter" data-name={'Active'}>
            Active
          </span>
          <span className="completedTodoFilter" data-name={'Completed'}>
            Completed
          </span>
        </div>
      </div>
    </React.Fragment>
  );
} else {
  return (
    
    <React.Fragment>
      <Modal
        isOpen={this.state.isEditModalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={this.handleModalClose}
        style={customStyles}
        contentLabel="Example Modal"
        editTodoWithThisId={this.state.editTodoWithThisId}
        handleEdit={this.handleEdit}
      >
        <h2 className="editTodoInModal">Edit your todo:</h2>
        {/* <button onClick={this.handleModalClose}>close</button> */}
        <div>
          <input type={"text"} value={this.state.editText} onChange={this.handleEdit} className="inputTextModal" />
        </div>
        <div>
        <input type="submit" onClick={this.handleEditedTodo} className="submitButtonModal"/>
        </div>
      </Modal>
      <div className="App">
        <h1>todos</h1>
        <div className="inputContainer">
          {/* <span ><select className="selectAllTodo"></select></span> */}
          <input type="text" placeholder="What needs to be done?" value={this.state.value} onChange={this.hanldeChange} className="inputText" onKeyPress={this.handleSubmit}
          />
          {/* <input type="submit" onClick={this.handleSubmit} className="submitButton"/> */}
        </div>
      </div>
      <List allTodo={this.state.selectedFilter === "All" ? this.state.allTodo : filteredTodo} deleteListElement={this.deleteListElement} markAsCompleted={this.markAsCompleted} editListThroughModal={this.editListThroughModal}
      />
    </React.Fragment>
  );
}
    
  }
}

export default App;
