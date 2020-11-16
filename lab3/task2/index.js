const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const connectionLink = "mongodb://mongodb:27017/dictionary";
const bp = require('body-parser').json();

// create application/json parser
app.use(bodyParser.json());
// parse various different custom JSON types as JSON
app.use(bodyParser.json({type: 'application/*+json'}));
// parse some custom thing into a Buffer
app.use(bodyParser.raw({type: 'application/vnd.custom-type'}));
// parse an HTML body into a string
app.use(bodyParser.json({type: 'text/html'}));
// parse an text body into a string
app.use(bodyParser.json({type: 'text/plain'}));
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

app.get('/words/:word', (req, res) => {
  MongoClient.connect(connectionLink, function (err, client) {
	if (err) {
	  return console.dir(err);
	}
	
	const db = client.db('dictionary');
	const collection = db.collection('dictionary');
	console.log(req.query);
	
	collection.findOne({name: req.params.word}, function (err, item) {
	  if (err) {
		res.json(err);
		return console.dir(err);
	  }
	  console.log("--------------------");
	  console.log(item);
	  console.log("--------------------");
	  return item ? res.json(item) : res.json({error: "no such item"});
	});
  });
});

app.post('/words', bp, (req, res) => {
  MongoClient.connect(connectionLink, function (err, client) {
	if (err) {
	  return console.dir(err);
	}
	
	const db = client.db('dictionary');
	const collection = db.collection('dictionary');
	
	const {name, definition} = req.body;
	console.log("--------------------");
	console.log(req.body);
	console.log("--------------------");
	collection.insert({name, definition});
	res.json({
	  message: "item inserted",
	  item: {
		name, definition
	  }
	})
  })
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
