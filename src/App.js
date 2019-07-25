import React, { Component } from 'react';
import Todos from './components/Todos';
import './App.css';

class App extends Component {
  state = {
    todos: [{id: "1"}],
    isLoaded: false,
  }

  getHeaderStyle = () => {
    return {
      padding: '10px',
      display: 'flex',
      justifyContent: 'center',
      background: '#f4f4f4'
    }
  }

  getInputStyle = () => {
    return {
      width: window.innerWidth / 1.5,
      height: '40px',
      display: 'flex',
      background: '#f4f4f4',
      textAlign: 'center',
      color: '#00AAFF',
      fontSize: '30px',
      margin: '0 auto'
    }
  }

  getButtonStyle = () => {
    return {
      marginTop: '100px',
      width: window.innerWidth / 10,
      height: '35px',
      display: 'flex',
      justifyContent: 'center',
      background: '#f4f4f4',
      textAlign: 'center',
      color: '#00AAFF',
      fontSize: '25px',
      margin: '0 auto'
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
      // alert(this.refs.task.value)
    });
  }

  deleteItem = (id) => {
    var todos_arr = [{}];
    var todo_delete = {};
    var index = 0;
    console.log("User deleted ToDo with ID: " + id);
    // this.setState({todos: [this.state.todos.filter(todo => todo.id !== id)] });
    this.setState({todos: this.state.todos.map(todo => {
      index++;
      if (todo.id === id) {
        // var index = this.state.todos.indexOf(id);
        // this.state.todos.splice(todo.id, 1);           // The standard way of removing things from arrays
        // delete this.state.todos[id-1];
        console.log("FOUND item which is to delete!");
        todo_delete.id = todo.id;
        todo_delete.title = todo.title;
        todo_delete.completed = todo.completed;
      } else {
        todos_arr.push(todo);
        // todos_arr.push(todo.title);
        // todos_arr.push(todo.completed);
      }
      
      return todos_arr;
    })})
    this.render();
    this.handlePost(todo_delete);
    console.log(todo_delete.title + "with ID: " + todo_delete.id + " has been deleted...");
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
    return (
      <div className="App">
        <h1 style={this.getHeaderStyle()}>To Dos:</h1><br/>
        <input style={this.getInputStyle()} placeholder="Enter new ToDo here..."/><br/>
        <button style={this.getButtonStyle()}>Add</button><br/>
        <Todos todos={this.state.todos} toggleComplete={this.toggleComplete} deleteItem={this.deleteItem}/>
      </div>
    );
  }
}

export default App;
