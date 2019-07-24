const fs = require('fs');

// import todos from './data/todos.json';        // A JSON File with infos about saved todos.

class FileHandler {
    // todos = require('./data/todos');

    getData() {
        var file = fs.readFile('./data/todos.json');
        var data = JSON.parse(file);

        return data;
    }


}

export default FileHandler;