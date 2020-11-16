const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;
const connectionLink = "mongodb://mongodb:27017/counter";

app.get('/counter', (req, res) => {
  MongoClient.connect(connectionLink, function (err, client) {
	if (err) {
	  return console.dir(err);
	}
	
	const db = client.db('counter');
	const firstItem = {counter: 1};
	const collection = db.collection('counter');
	
	collection.findOne({counter: {$gt: 0}}, function (err, item) {
	  if (err) {
		res.json(err);
		return console.dir(err);
	  }
	  if (!item) {
		collection.insert(firstItem);
		res.json(firstItem);
		return;
	  } else {
		collection.updateOne({counter: {$gt: 0}}, {$set: {counter: ++item.counter}});
		res.json(item);
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
