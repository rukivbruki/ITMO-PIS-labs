
const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;
const connectionLink = "mongodb://mongodb:27017/counter";
const hostname = require("os").hostname();

app.get('/counter', (req, res) => {
    MongoClient.connect(connectionLink, function (err, client) {
        if (err) { return console.dir(err); }

        const db = client.db('counter');
        const firstItem = { counter: 1 };
        const collection = db.collection('counter');

        collection.findOne({ counter: { $gt: 0 } }, function (err, item) {
            if (err) {
                res.json({ err, hostname });
                return console.dir(err);
            }
            if (!item) {
                collection.insert(firstItem);
                res.json({ counter: firstItem.counter, hostname });
                return;
            } else {
                collection.updateOne({ counter: { $gt: 0 } }, { $set: { counter: ++item.counter } });
                res.json({ counter: item.counter, hostname });
                return;
            }
        });
    });
})

app.get("/", (req, res) => {
    res.send("Hello world!");
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})