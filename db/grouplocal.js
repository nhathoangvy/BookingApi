const mongoose = require('mongoose');
const groupLocalSchema = mongoose.Schema({
  name :  {type: String, required: true},
  });

module.exports = mongoose.model('GroupLocal', groupLocalSchema);
