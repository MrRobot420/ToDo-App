import React, { Component } from 'react';
import Todos from './components/Todos';
import InputField from './components/InputField';
import './App.css';

class App extends Component {
  state = {
    todos: [],
    isLoaded: false,
  }

  todo_delete = {};

  getHeaderStyle = () => {
    return {
      padding: '10px',
      display: 'flex',
      justifyContent: 'center',
      background: '#f4f4f4'
    }
  }

  toggleComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        if (todo.completed) {
          console.log("User did finish ToDo with ID: " + id + " | Named: " + todo.title);
        } else {
          console.log("User deselected ToDo with ID: " + id + " | Named: " + todo.title);
        }
      }
      return todo;
    })})
  }

  handlePost = (todo) => {
    fetch('http://localhost:5000/todos', {
      method: 'POST',
      body: {
        task_id: JSON.stringify(todo.id)
      },
      todo: [
        JSON.stringify(todo)
      ],
      id: JSON.stringify(todo.id),
      completed: JSON.stringify(todo.completed),
      headers: {"Content-Type": "application/json"}
    })
    .then((res) => {
      console.log(res);
      return res;
    }).then((todos) => {
      console.log(todos);
    });
  }

  addItem = (title) => {
    console.log("User clicked on ADD button!");
    console.log("User wants to add new todo with title: " + title);
  }

  deleteItem = (id) => {
    var todos_arr = [];
    
    var index = 0;
    console.log("User deleted ToDo with ID: " + id);

    var something = () => {this.state.todos.map(todo => {
      if (todo.id === id) {
        console.log("FOUND item which is to delete!");
        this.todo_delete[0] = todo;
      } else {
        todos_arr[index] = todo
        index++;
      }
      return todo;
    })};
    something();    // Call something() in order to fill todos_arr.

    var reduced_todos = {todos: todos_arr};
    console.log(reduced_todos);
    this.setState(reduced_todos);

    // this.render();
    this.handlePost(this.todo_delete);
    console.log(this.todo_delete.title + "with ID: " + this.todo_delete.id + " has been deleted...");
    console.log("TODOS LEFT: ");
    console.log(todos_arr);
  }

  // Runs after the render method!
  componentDidMount() {
    fetch('http://localhost:5000/todos/todos.json')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          todos: json.todos
        })
    });
  }

  render() {
    console.log("TODOS AFTER NEW RENDERING OCCURRED: ")
    console.log(this.state.todos)
    return (
      <div className="App">
        <h1 style={this.getHeaderStyle()}>TO DO</h1><br/>
        <InputField addItem={this.addItem}></InputField>
        <Todos todos={this.state.todos} toggleComplete={this.toggleComplete} deleteItem={this.deleteItem}/>
      </div>
    );
  }
}

export default App;
