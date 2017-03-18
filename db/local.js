const mongoose = require('mongoose');
const localSchema = mongoose.Schema({
  local : String,
  group : String
  });

module.exports = mongoose.model('Local', localSchema);
