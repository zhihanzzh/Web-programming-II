var fs =require('fs')
const peopleList=JSON.parse(fs.readFileSync('dood.json'));

const redisConnection = require("./redis-connection");
