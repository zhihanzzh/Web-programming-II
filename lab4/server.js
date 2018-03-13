const express = require('express');
const app = express();

const redis = require('redis');
const client = redis.createClient();

const bluebird = require('bluebird');

const data = require('./data.js');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


let userList = [];
app.get('/api/people/history', async (req, res) => {
    let result = [];
    for(let i = 0; i < userList.length && i < 20; i++) {
        let user = JSON.parse(await client.getAsync(userList[i]))
        result.push(user)
    }
    res.json(result)
}) 