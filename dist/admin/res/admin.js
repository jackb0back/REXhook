const socket = io("/admin", {
    auth: {
        token: "2f35c1073c86b7087a504ad9183f6a24ced9f49a7b29f5aac60acccadd62cafb"
    }
});

var peer = new Peer();
var currentConnection;

function connect(id) {
    var conn = peer.connect(id);
    currentConnection = conn;
    conn.on('open', function() {
        console.log("connected to peer:", id);
        // Receive messages
        conn.on('data', function(data) {
            console.log('Received', data);
        });

        // Send messages
        conn.send('Hello!');
    });

    conn.on('error', function(err) {
        console.error('Connection error:', err);
    });
}

socket.on('connect', () => {
    console.log("socket connected");
    setTimeout(() => {
        socket.emit("getHooks", "");
    });
});

socket.on("hooks", (data) => {
    console.log(data);
    if (data && data.length > 0) {
        connect(data[0].peer); // Assuming data contains peer IDs
    }
});
