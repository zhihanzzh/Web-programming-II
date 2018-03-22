var fs =require('fs')
const peopleList=JSON.parse(fs.readFileSync('dood.json'));

const redisConnection = require("./redis-connection");

redisConnection.on("get-person:request:*", (message, channel) => {
    let requestId = message.requestId;
    let eventName = message.eventName;

    let id = message.data.message;

    let successEventName = `${eventName}:success:${messageId}`;
    let failedEventName = `${eventName}:failed:${messageId}`;

    let flag = false;
    let response;
    for(let i = 0; i < data.length; i++) {
        if (data[i]["id"] == id) {
            flag = true;
            response = data[i];
            break;
        }
    }

    if(!flag) {
        redisConnection.emit(failedEventName, {
            requestId: requestId,
            data: {
                message: "Didn't find person with provided ID"
            },
            eventName: eventName
        });
    } else {
        redisConnection.emit(successEventName, {
            requestId: requestId,
            data:  response,
            eventName: eventName
        });
    }
});


redisConnection.on("create-person:request:*", (message, channel) => {
    let requestId = message.requestId;
    let eventName = message.eventName;

    let info = message.data.message;

    let successEventName = `${eventName}:success:${messageId}`;
    let failedEventName = `${eventName}:failed:${messageId}`;

    let flag = true;
    let response;
    for(let i = 0; i < data.length; i++) {
        if (data[i]["id"] == id) {
            flag = false;
            break;
        }
    }

    if(!flag) {
        redisConnection.emit(failedEventName, {
            requestId: requestId,
            data: {
                message: "Didn't find person with provided ID"
            },
            eventName: eventName
        });
    } else {
        redisConnection.emit(successEventName, {
            requestId: requestId,
            data:  response,
            eventName: eventName
        });
    }
});