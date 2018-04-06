const app = require('express')();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const static = require('express').static(__dirname + '/public');
app.use("/", static);
const nrpSender = require('./npr-sender-shim');
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


io.on('connection', function (socket) {
    socket.on("query", async (msg) => {
        if (msg.name === '') {
            socket.emit('noName', 'please provide a name');
        } else if(msg.img === '') {
            socket.emit('noSearch', 'please provide a name of image to search');
        } else {
            try {
                let response = await nrpSender.sendMessage({
                    eventName: 'search',
                    data: msg
                });
                let hits = response.results.hits;
                //console.log(response.results.hits.length)
                io.emit('response', response);
            } catch (e) {
                socket.emit('fail', e.message);
            }
        }
       
    });
});


http.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});