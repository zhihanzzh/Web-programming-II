var fs =require('fs')
const peopleList=JSON.parse(fs.readFileSync('dood.json'));

const redisConnection = require("./redis-connection");

redisConnection.on("get-person:request:*", (message, channel) => {
    let requestId = message.requestId;
    let eventName = message.eventName;

});