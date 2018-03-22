const express = require("express");
const bodyParser = require("body-parser");

const nrpSender = require("./nrp-sender-shim");
const redisConnection = require("./redis-connection");

const app = express();

app.use(bodyParser.json());

app.get("/api/people/:id", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "get-person",
            data: {
                message: req.params.id
            }
        });
        res.json(response);
    } catch (e) {
        res.json({ error: e.message });
    }
})

app.post("/api/people", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "create-person",
            data: {
                message: req.body
            }
        });
        res.json(response);
    } catch (e) {
        res.json({ error: e.message });
    }
})

app.delete("/api/people/:id", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "delete-person",
            data: {
                message: req.params.id
            }
        });
        res.json(response);
    } catch (e) {
        res.json({ error: e.message });
    }
})

app.put("/api/people/:id", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "update-person",
            data: {
                message: req.params.id
            }
        });
        res.json(response);
    } catch (e) {
        res.json({ error: e.message });
    }
})