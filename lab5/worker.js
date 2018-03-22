var fs = require('fs');
const http = require('https');
const redisConnection = require('./redis-connection');
const url = 'https://gist.githubusercontent.com/philbarresi/5cf15393d245b38a2d86ce8207d5076c/raw/d529fb474c1af347702ca4d7b992256237fa2819/lab5.json';

let data = http.get(url, function (response) {
    // data = JSON.parse(response.statusCode);
     response.pipe(fs.createWriteStream('dood.json')).on('close', function() {
        var bu = fs.createReadStream('dood.json');
        bu.on('data', function(chunk) {
            console.log(chunk.toString());
        });
     })
});