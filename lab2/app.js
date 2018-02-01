const express = require("express");
const app = express();
const static = express.static(__dirname + '/public');

app.use("/", static);

app.get('/', (req, res) => {
    res.sendFile(__dirname +'/public/index.html');
});

app.get('*', (req, res) => {
    res.sendStatus(404);
});

app.listen(3000, () => {  
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});