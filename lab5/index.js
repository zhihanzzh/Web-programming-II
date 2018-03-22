const redisConnection = require("./redis-connection");


redisConnection.on('say hello', function(data){
    console.log('Hello ' + data.name);
  });

redisConnection.on('city:*', (data, channel) => {
    console.log(data.city + ' is great');
  });