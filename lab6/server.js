const app = require('express')();
const http = require("http").Server(app);
const io = require("socket.io")(http);
//const pixabay = io.of('/pixabay');

app.get('/', (req, res) => {
    res.sendFile(__dirname +'/public/index.html');
});


io.on('connection', function(socket){
    console.log('a user connected');
    socket.on("direct message", (msg) => {
        console.log(msg);
    });
  });


http.listen(3000, () => {  
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});