const mongoose = require('mongoose');
const propertySchema = mongoose.Schema({
    property : {type: String, required: true},
    userID : String
  });
module.exports = mongoose.model('Property', propertySchema);
