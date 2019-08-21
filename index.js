/*
  index.js: root file of the project. 
*/
require('dotenv').config()
// Import required modules
const express = require('express'),
  app = express(), // Initialize express app
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Tododb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const tasksRoutes = require('./routes/taskRoutes');

app.use("/tasks", logger, tasksRoutes);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('server started on: ' + port);

// log evry request using logger middleware function
function logger(req, res, next) {
	console.log(`${req.method} -->  ${req.originalUrl}`);
	next();
}