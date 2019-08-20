var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  name: {
    type: String,
    Required: 'Kindly enter the name of the task'
  },
  channel_id: {
    type: String,
    Required: 'Kindly enter the channel id'
  },
  created_by: {
    type: String
  },
  created_date: {
    type: Date,
    default: Date.now
  },
});


module.exports = mongoose.model('Tasks', TaskSchema);