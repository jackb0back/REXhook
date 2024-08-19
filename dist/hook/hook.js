var peer;
if (localStorage.getItem("_peer") !== null) {
    peer = new Peer(localStorage.getItem("_peer"));
}else {
    peer = new Peer(generateRandomString(10));
    localStorage.setItem("_peer",peer.id);
}

//Websocket
const socket = io("/hook");
socket.on('connect', () => {
    console.log("connected");
    setTimeout(function(){
        socket.emit("newHook",{
            "peer": peer.id,
            "page": window.location.href,
            "title": document.title
        });
    },150)
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
