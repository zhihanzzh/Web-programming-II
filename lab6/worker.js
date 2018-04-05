const axiosInstance = require('./axiosHelper.js');
const redisConnection = require('./utils/redis-connection.js');

redisConnection.on('lookup:request:*', async function (message, channel) {
    let requestId = message.requestId;
    let eventName = message.eventName;
});