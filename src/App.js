import React, { Component } from 'react';
import Todos from './components/Todos';
import './App.css';

class App extends Component {
  state = {
    todos: [],
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

  toggleComplete = (id) => {
    console.log("User clicked on ToDo with ID: " + id)
    this.setState({ todos: this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    })})
  }

  handlePost = (id, comp_state) => {
    fetch('http://localhost:5000/todos', {
      method: 'POST',
      body: {
        task_id: id
      },
      todos: [
        this.state.todos
      ],
      id: id,
      completed: comp_state,
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
    console.log("User deleted ToDo with ID: " + id);
    // this.setState({todos: [this.state.todos.filter(todo => todo.id !== id)] });
    this.setState({todos: this.state.todos.map(todo => {
      if (todo.id === id) {
        // var index = this.state.todos.indexOf(id);
        this.state.todos.splice(todo.id, 1);
        // delete this.state.todos[id-1];
        console.log(todo.title + " has been deleted...");
        console.log(this.state.todos);
        this.handlePost(id-1, this.state.completed);
      }
      return todo;
    })})
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
        <h1 style={this.getHeaderStyle()}>To Dos:</h1><br></br>
        <Todos todos={this.state.todos} toggleComplete={this.toggleComplete} deleteItem={this.deleteItem}/>
      </div>
    );
  }
}

export default App;
