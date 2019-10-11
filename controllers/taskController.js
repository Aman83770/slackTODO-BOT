Task = require('../models/taskModel');

var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks');

// get all tasks
exports.getAllTaks = function(req, res) {
  Task.find({channel_id: req.body.channel_id}, function(err, task) {
    if (err) {
      return res.send(err);
    }

    let text = "";
    let i = 1;
    task.forEach(obj => {
      if(obj.name) text += i + ") " + obj.name + "\n";
      i += 1;
    });
    
    text = text === "" ? `No TODOs` : text;  
    return res.send({ "response_type": "in_channel", "text": text });
  });
};

// create a todo
exports.createTask = function(req, res) {
  const data = req.body;

  let final;
  if (!data.text || data.text === "") {
    final = {
      // "response_type": "in_channel", // error should not be seen by all
      "attachments": [
        {
            "color": "#FF4500",
            "pretext": "An Error Happened",
            "title": "Cannot add todo with empty message"
        }
      ]
    }
    return res.send(final);
  }

  data.name = data.text;
  delete data.text;

  var newTask = new Task(data);
  newTask.save((err, task) => {
    if (err) {
      return res.send(err);
    }
    final = {
      "response_type": "in_channel",
      "replace_original": true,
      "text": "<@"+data.user_name+"> added " + "`"+data.name+"`"
    }
    return res.send(final);
  });
};

exports.deleteTask = function(req, res) {
  const data = req.body;
  let final;

  if (!data.text || data.text === "") {
    final = {
      // "response_type": "in_channel", // error should not be seen by all
      "attachments": [
        {
            "color": "#FF4500",
            "pretext": "An Error Happened",
            "title": "Cannot delete todo with empty message/name"
        }
      ]
    }
    return res.send(final);
  }

  Task.deleteOne({
    name: data.text,
    channel_id: data.channel_id
  }, function(err, result) {
    if (err)
      return res.send(err);
    // when there is no todo match
    if (result.deletedCount < 1 ) {
      final = {
        // "response_type": "in_channel", // error should not be seen by all
        "attachments": [
          {
              "color": "#FF4500",
              "pretext": "An Error Happened",
              "title": "No Todo found with this message"
          }
        ]
      }
      return res.send(final);
    }

    final = {
      "response_type": "in_channel", // error should not be seen by all
      "attachments": [
        {
            "color": "#008000",
            "pretext": "TODO is removed from list",
            "title": data.text
        }
      ]
    }
    return res.json(final);
  });
};

exports.deleteTaskById = function(req, res) {
  const data = req.body;
  let final;

  if (!data.id || data.id === "") {
    final = {
      // "response_type": "in_channel", // error should not be seen by all
      "attachments": [
        {
            "color": "#FF4500",
            "pretext": "An Error Happened",
            "title": "Cannot delete todo without Id"
        }
      ]
    }
    return res.send(final);
  }

  Task.deleteOne({
    id: data.id,
    channel_id: data.channel_id
  }, function(err, result) {
    if (err)
      return res.send(err);
    // when there is no todo match
    if (result.deletedCount < 1 ) {
      final = {
        // "response_type": "in_channel", // error should not be seen by all
        "attachments": [
          {
              "color": "#FF4500",
              "pretext": "An Error Happened",
              "title": "No Todo found with this id"
          }
        ]
      }
      return res.send(final);
    }

    final = {
      "response_type": "in_channel", // error should not be seen by all
      "attachments": [
        {
            "color": "#008000",
            "pretext": "TODO is removed from list",
            "title": data.text
        }
      ]
    }
    return res.json(final);
  });
};
