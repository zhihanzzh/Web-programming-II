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

app.get('/api/people/:id', async (req,res) => {

    let user = client.getAsync(req.param.id);

    if(user) {
        res.json(JSON.parse(user))
        await client.lpush('list',people);
    } else {
        try {
            let person = data.getById(req.param.id)
            await client.setAsync(req.params.id, JSON.stringify(person));
            await client.lpush('history', JSON.stringify(person));
            res.json(person)
        } catch (e){

        }
    }
})