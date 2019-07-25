import React, { Component } from 'react';
import Todos from './components/Todos';
import InputField from './components/InputField';
import './App.css';
var mock_object = {id: "1", title: "I am just here for testing!"};

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

  addItem = () => {
    console.log("was clicked!");
  }

  deleteItem = (id) => {
    var todos_arr = {};
    
    var index = 0;
    console.log("User deleted ToDo with ID: " + id);
    // this.setState({todos: [this.state.todos.filter(todo => todo.id !== id)] });

    this.setState({ todos: this.state.todos.map(todo => {
      if (todo.id === id) {
        // this.state.todos.splice(todo.id, 1);           // The standard way of removing things from arrays
        // delete this.state.todos[id-1];
        console.log("FOUND item which is to delete!");
        // this.state.todos.splice(todo.id-1, 1);
        this.todo_delete[0] = todo;
      } else {
        // todos_arr.push(todo);
        todos_arr[index] = todo
        index++;
        return todo;
        // todos_arr.push(todo.title);
        // todos_arr.push(todo.completed);
      }
      return null;
    })});

    this.render();
    this.handlePost(this.todo_delete);
    console.log(this.todo_delete.title + "with ID: " + this.todo_delete.id + " has been deleted...");
    console.log("TODOS LEFT: ");
    console.log(todos_arr);
  }

  deleteItem2= (id) => {
    var todos_arr = [];
    
    var index = 0;
    console.log("User deleted ToDo with ID: " + id);
    // this.setState({todos: [this.state.todos.filter(todo => todo.id !== id)] });


    var something = this.state.todos.map(todo => {
      if (todo.id === id) {
        // this.state.todos.splice(todo.id, 1);           // The standard way of removing things from arrays
        // delete this.state.todos[id-1];
        console.log("FOUND item which is to delete!");
        // this.state.todos.splice(todo.id-1, 1);
        this.todo_delete[0] = todo;
      } else {
        // todos_arr.push(todo);
        todos_arr[index] = todo
        index++;
        // todos_arr.push(todo.title);
        // todos_arr.push(todo.completed);
      }
    });
    console.log("SOMETHING:");
    console.log(something);

    var reduced_todos = {todos: todos_arr};
    console.log(reduced_todos);
    this.setState(reduced_todos);

    this.render();
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
        <InputField></InputField>
        <Todos todos={this.state.todos} toggleComplete={this.toggleComplete} deleteItem={this.deleteItem2}/>
      </div>
    );
  }
}

export default App;
