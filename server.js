'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const { DATABASE_URL, PORT } = require('./config');
const { Blog } = require('./models');

const blogRouter = require('./blogRouter');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.use('/posts', blogRouter);

app.use('*', function(req, res) {
	res.status(404).json({ message: 'Not Found' });
});

let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl = DATABASE_URL, port = PORT) {
	return new Promise((resolve, reject) => {
		mongoose.connect(databaseUrl, { useMongoClient: true }, err => {
			if (err) {
				return reject(err);
			}
			server = app
				.listen(port, () => {
					console.log(`Your app is listening on port ${port}`);
					resolve();
				})
				.on('error', err => {
					mongoose.disconnect();
					reject(err);
				});
		});
	});
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
	return mongoose.disconnect().then(() => {
		return new Promise((resolve, reject) => {
			console.log('Closing server');
			server.close(err => {
				if (err) {
					return reject(err);
				}
				resolve();
			});
		});
	});
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
	runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
