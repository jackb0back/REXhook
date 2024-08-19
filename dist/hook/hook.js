var peer;
var connections = [];

if (localStorage.getItem("_peer") !== null) {
    peer = new Peer(localStorage.getItem("_peer"));
} else {
    peer = new Peer(generateRandomString(10));
    localStorage.setItem("_peer", peer.id);
}

const socket = io("/hook");
socket.on('connect', () => {
    console.log("socket connected");
    setTimeout(function() {
        socket.emit("newHook", {
            "peer": peer.id,
            "page": window.location.href,
            "title": document.title
        });
    }, 150);
});

peer.on('open', function(id) {
    console.log('My peer ID is: ' + id);
});

peer.on('connection', (conn) => {
    console.log("Incoming connection from peer:", conn.peer);
    connections.push(conn);

    conn.on('open', () => {
        console.log("Connected to peer:", conn.peer);
        conn.send("Hello from peer!");
    });

    conn.on('data', (data) => {
        console.log("Received data from peer:", data);
    });

    conn.on('error', (err) => {
        console.error('Connection error:', err);
    });
});

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
