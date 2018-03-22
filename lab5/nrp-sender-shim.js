const uuid = require('node-uuid');

const redisConnection = require('./redis-connection');

const defaultMessageConfig = {
    data: {},
    timeout: 1000,
    eventName: 'send',
    redis: redisConnection,
    expectsResponse: true
};

const sendMessage = function (messageConfig = defaultMessageConfig) {
    return new Promise(function (fulfill, reject) {
        let settings = Object.assign({}, defaultMessageConfig, messageConfig);

        let messageId = uuid.v4();
        let killswitchTimeoutId = undefined;
        let redisConnection = settings.redis;
        let eventName = settings.eventName;
        let outgoingEventName = `${eventName}:request:${messageId}`;

        if (settings.expectsResponse) {
            let successEventName = `${eventName}:success:${messageId}`;
            let failedEventName = `${eventName}:failed:${messageId}`;

            let success = redisConnection.on(successEventName, function (response, channel) {
                fulfill(response.data);
                endMessageLifeCycle();
            });

            let error = redisConnection.on(failedEventName, function (response, channel) {
                reject(response.data);
                endMessageLifeCycle();
            });

            let shutoffEvents = [success, error];

            let endMessageLifeCycle = function () {
                shutoffEvents.forEach(shutOff => {
                    shutOff();
                });
                clearTimeout(killswitchTimeoutId);
            };

            if (settings.timeout >= 0) {
                killswitchTimeoutId = setTimeout(function () {
                    reject(new Error('timed out'));
                    endMessageLifeCycle();
                }, settings.timeout);
            }
        }

        redisConnection.emit(outgoingEventName, {
            requestId: messageId,
            data: settings.data,
            eventName: settings.eventName
        });

        if (!settings.expectsResponse) {
            fulfill();
        }
    });
};

module.exports  = { sendMessage };