var fs = require('fs');
var todos = fs.readFileSync('/Users/Maxi/Desktop/atom/javaScript/react/todo_app/src/data/todos.json');
var express = require('express');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('./sslcert/private.key', 'utf8');
var certificate = fs.readFileSync('./sslcert/server.crt', 'utf8');

const cors = require("cors");

// Origins to trust:
var whitelist = [   'http://localhost:5000',
                    'http://localhost:5000/todos',
                    'http://localhost:5000/todos/todos.json',
                    'http://localhost:8080', 
                    'http://localhost:8080/todos/todos.json',
                    'https://localhost:8443', 
                    'https://localhost:8443/todos/todos.json'
                ];

// CORS Function to check if REQ came from src of whitelist: 
var corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true}
    } else {
        corsOptions = { origin: false}
    }
    callback(null, corsOptions);
}

var credentials = {key: privateKey, cert: certificate};
var app = express();
// your express configuration here
app.use(cors());

app.set('view engine', 'ejs');

app.get('/todos/todos.json', cors(corsOptionsDelegate), (req, res, next) => {
    res.sendFile('/Users/Maxi/Desktop/atom/javaScript/react/tutorial_app/src/data/todos.json');
    console.log("New GET request: todos.json");
});

// Delete request for entity (to do) :
app.post('/todos', cors(corsOptionsDelegate), (req, res) => {
    let task_id = req.todos.id;

    if (!task_id) {
        return res.status(400).send({error: true, message: 'Please provide task_id'});
    }
    var data = todos;
    console.log(data); 
    console.log("New POST request: bLANk")
    return res.sendFile(data);
})

// Delete request for entity (to do) :
app.delete('/todos', (req, res) => {
    let task_id = req.body.task_id;

    if (!task_id) {
        return res.status(400).send({error: true, message: 'Please provide task_id'});
    }
    var data = todos;
    console.log(data); 
    console.log("New POST request: delete todos.json")
})

var ssl_port = 8443;
var port = 5000;

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(port);
console.log("Listening on port: " + port);
httpsServer.listen(ssl_port);
console.log("Listening on SSL port: " + ssl_port);
// app.listen(port);