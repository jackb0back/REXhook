const socket = io("/admin",{
    auth: {
        token: "2f35c1073c86b7087a504ad9183f6a24ced9f49a7b29f5aac60acccadd62cafb"
    }
});



socket.on('connect', () => {
    console.log("connected");
    setTimeout(() => {
        socket.emit("getHooks","");
    })
});

socket.on("hooks", (data) => {
    console.log(data);
})