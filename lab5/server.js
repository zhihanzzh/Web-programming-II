const redisConnection = require("./redis-connection");

  
  redisConnection.emit('say hello', { name: 'Louis' });   // Outputs 'Hello Louis'
  
  // You can use patterns to capture all messages of a certain type
  // The matched channel is given as a second parameter to the callback

  
  redisConnection.emit('city:hello' , { city: 'Paris' });         // Outputs 'Paris is great'
  redisConnection.emit('city:yeah'  , { city: 'San Francisco' }); // Outputs 'San Francisco is great'

