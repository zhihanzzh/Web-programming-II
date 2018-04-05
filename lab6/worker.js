const axiosInstance = require('./helper.js');
const redisConnection = require('./redis-connection.js');

redisConnection.on('search:request:*', async function (message, channel) {
    let requestId = message.requestId;
    let eventName = message.eventName;
    
    let successEvent = eventName + ':success:' + requestId;
    let failedEvent = eventName + ':failed:' + requestId;

    let name = message.data.name;
    let img = encodeURIComponent(message.data.img);
    let msg = message.data.message;


    let searchString = '?q=' + img;
    console.log("name");

    try {
        // let response = await axiosInstance.get(searchString);

        // redisConnection.emit(successEvent, {
        //     requestId,
        //     eventName,
        //     data: {
        //         name,
        //         message: msg,
        //         results: response.data
        //     }
        // });
        console.log(name);
    } catch (e) {
        console.log('Request error:\n' + e);
        redisConnection.emit(failedEvent, {
            requestId,
            eventName,
            data: e.response.data
        });
    }
});