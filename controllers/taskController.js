Task = require('../models/taskModel');

var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks');

// get all tasks
exports.getAllTaks = function(req, res) {
  console.log(req.body);
  Task.find({}, function(err, task) {
    if (err)
      return res.send(err);
    console.log(task);
    let arr = [];
    task.forEach(obj => {
      if(obj.name) arr.push(obj.name);
    })
    return res.send(`${arr}`);
  });
};

// create a todo
exports.createTask = function(req, res) {
  console.log(req.body);
  const a = req.body;
  a.name = a.text;
  var newTask = new Task(a);
  newTask.save((err, task) => {
    if (err)
      return res.send(err);
    return res.sendStatus(200);
  });
};

exports.deleteTask = function(req, res) {
  Task.remove({
    name: req.body.name
  }, function(err, task) {
    if (err)
      return res.send(err);
    return res.json({ message: 'Task successfully deleted' });
  });
};