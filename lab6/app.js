const app = require('express')();
const http = require("http").Server(app);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

http.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});