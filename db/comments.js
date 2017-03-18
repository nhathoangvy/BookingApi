const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
  userID : {type: String, required: true},
  content : String,
  created : {type: 'Date', required: true},
  edited : {type: 'Date'},
  idPage: String
  });

module.exports = mongoose.model('Comment', commentSchema);
