const repl = require("repl");
repl.start({
  eval: (cmd, context, filename, callback) => {
    with (context) callback(null, eval(cmd))
  }
});
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const cors = require('cors'); // Import the cors package
const PORT = 3005;
const SHA256 = require("crypto-js/sha256");
const { Socket } = require("socket.io");
const io = require('socket.io')(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
});
const hook = io.of("/hook");
const admin = io.of("/admin");
const TOKEN = "OASIS"
const admin_conn = null;
const verifyToken = (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error('Authentication error'));
    }
  
    const hashedToken = SHA256(TOKEN).toString();
    if (token === hashedToken) {
        next();
    } else {
        return next(new Error('Authentication error'));
    }
  };
const connect = (socket, next) => {

};
admin.use(verifyToken);
hook.use(connect);
var users = {};


app.use(cors()); // Use the cors middleware
app.use(express.static(path.join(__dirname, 'dist')));


hook.on('connection', (socket) => {
    socket.emit("message","connected");
    users[socket.handshake.address] = {
        "sock": socket,
        "peer": ""
    };
    
    hook.on('disconnect', () => {
        console.log(socket.handshake.address + " disconnected")
        delete users[socket.handshake.address];
    })
});

admin.on('connection', (socket) => {
    socket.emit("Admin connected");
    admin_conn = socket;

    
    admin.on('hook', () => {

    });
    
    admin.on('disconnect', () => {
        console.log("Admin disconnected");
        admin_conn = null;
    });
});