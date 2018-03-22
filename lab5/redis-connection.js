const NRP = require("node-redis-pubsub");
const config = {
  port: 6379,
  scope: "lab5" 
};

const nrp = new NRP(config); 

module.exports = nrp;


