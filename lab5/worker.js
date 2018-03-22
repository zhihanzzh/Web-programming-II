

const fs =require('fs');
//const peopleList=JSON.parse(fs.readFileSync('dood.json'));

const redisConnection = require("./redis-connection");

let list = JSON.parse(fs.readFileSync('dood.json'));

redisConnection.on("get-person:request:*", (message, channel) => {
    let requestId = message.requestId;
    let eventName = message.eventName;

    let id = message.data.message;

    let successEvent = `${eventName}:success:${requestId}`;
    let failedEvent = `${eventName}:failed:${requestId}`;

    let flag = false;
    let person = null;

    for(let i = 0; i < list.length; i++) {
        if (list[i]["id"] == id) {
            flag = true;
            person = list[i];
            break;
        }
    }
    if(!flag) {
        redisConnection.emit(failedEvent, {
            requestId: requestId,
            data: {
                message: "Didn't find person with provided ID"
            },
            eventName: eventName
        });
    } else {
        redisConnection.emit(successEvent, {
            requestId: requestId,
            data:  person,
            eventName: eventName
        });
    }
});

redisConnection.on("create-person:request:*", (message, channel) => {
    let requestId = message.requestId;
    let eventName = message.eventName;

    let info = message.data.message;

    let successEvent = `${eventName}:success:${requestId}`;
    let failedEvent = `${eventName}:failed:${requestId}`;

    let error = '';

    if (info.id === null || info.id === undefined) {
        error = "please provide a valid ID";
    }
    if (info.first_name === null || info.first_name === undefined) {
        error = "please provide a valid ID";
    }
    if (info.last_name === null || info.last_name === undefined) {
        error = "please provide a valid ID";
    }
    if (info.email === null || info.email === undefined) {
        error = "please provide a valid ID";
    }
    if (info.gender === null || info.gender === undefined) {
        error = "please provide a valid ID";
    }
    if (info.ip_address === null || info.ip_address === undefined) {
        error = "please provide a valid ID";
    }

    let flag = true;
    for(let i = 0; i < list.length; i++) {
        if (list[i]["id"] == info.id) {
            flag = false;
            break;
        }
    }
    if(!flag) {
        redisConnection.emit(failedEvent, {
            requestId: requestId,
            data: {
                message: "Didn't find person with provided ID"
            },
            eventName: eventName
        });
    } else if (error !== '') {
        redisConnection.emit(failedEvent, {
            requestId: requestId,
            data: {
                message: error
            },
            eventName: eventName
        });
    } else {
        list.push(info);
        redisConnection.emit(successEvent, {
            requestId: requestId,
            data: info,
            eventName: eventName
        });
    }
});

redisConnection.on("delete-person:request:*", (message, channel) => {
    let requestId = message.requestId;
    let eventName = message.eventName;

    let id = message.data.message;

    let successEvent = `${eventName}:success:${requestId}`;
    let failedEvent = `${eventName}:failed:${requestId}`;

    let flag = false;
    let response;
    for(let i = 0; i < list.length; i++) {
        if (list[i]["id"] == id) {
            flag = true;
            list.splice(i,1);
            break;
        }
    }

    if(!flag) {
        redisConnection.emit(failedEvent, {
            requestId: requestId,
            data: {
                message: "Didn't find person with provided ID"
            },
            eventName: eventName
        });
    } else {
        redisConnection.emit(successEvent, {
            requestId: requestId,
            data:  {
                message:"delete succeed"
            },
            eventName: eventName
        });
    }
});


redisConnection.on("update-person:request:*", (message, channel) => {
    let requestId = message.requestId;
    let eventName = message.eventName;

    let info = message.data.message;
    let id = message.data.id;
    let successEvent = `${eventName}:success:${requestId}`;
    let failedEvent = `${eventName}:failed:${requestId}`;

    let error = '';
    if (info.id === null || info.id === undefined) {
        error = "please provide a valid ID";
    }
    if (info.first_name === null || info.first_name === undefined) {
        error = "please provide a valid ID";
    }
    if (info.last_name === null || info.last_name === undefined) {
        error = "please provide a valid ID";
    }
    if (info.email === null || info.email === undefined) {
        error = "please provide a valid ID";
    }
    if (info.gender === null || info.gender === undefined) {
        error = "please provide a valid ID";
    }
    if (info.ip_address === null || info.ip_address === undefined) {
        error = "please provide a valid ID";
    }
    let flag = false;
    for(let i = 0; i < list.length; i++) {
        if (list[i]["id"] == id) {
            flag = true;
            list.splice(i,1, info);
            break;
        }
    }

    if (error !== '') {
        redisConnection.emit(failedEvent, {
            requestId: requestId,
            data: {
                message: error
            },
            eventName: eventName
        });
    } else if(!flag) {
        redisConnection.emit(failedEvent, {
            requestId: requestId,
            data: {
                message: "Didn't find person with provided ID"
            },
            eventName: eventName
        });
    } else {
        redisConnection.emit(successEvent, {
            requestId: requestId,
            data: info,
            eventName: eventName
        });
    }
});