const app = require('express')();
const http = require("http").Server(app);
const io = require("socket.io")(http);
//const pixabay = io.of('/pixabay');
const nrpSender = require('./npr-sender-shim');
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on("direct message", async (msg) => {
        try {
            let response = await nrpSender.sendMessage({
                eventName: 'search',
                data: msg
            });
            let hits = response.results.hits;
            console.log(response)
            //console.log(response.results.hits.length)
            for (let i = 0; i < hits.length; i++) {
                console.log(i);
            }
            io.emit('response', response);
        } catch (e) {
            socket.emit('request-fail', e.message);
        }
    });
});


http.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});