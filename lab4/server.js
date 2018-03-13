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
    const len = await client.llenAsync('history')
    userList = await client.lrangeAsync('list',0,len)
    for (let i = 0; i < len && i < 20; i++) {
        let user = JSON.parse(await client.getAsync(userList[i]))
        result.push(user)
    }
    res.json(result)
})

app.get('/api/people/:id', async (req, res) => {

    let user = await client.getAsync(req.params.id);

    if (user) {
        res.json(JSON.parse(user))
        await client.lpush('history', JSON.parse(user));
    } else {
        try {
            let person = await data.getById(req.params.id)
            await client.setAsync(req.params.id, JSON.stringify(person));
            await client.lpush('history', JSON.stringify(person));
            res.json(person)
        } catch (e) {
            response.status(400).json({ e: "No person found with provided ID" });
        }
    }
})

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});