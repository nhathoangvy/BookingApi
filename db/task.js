  const mongoose = require('mongoose');
  const taskSchema = mongoose.Schema({
    purpose :  {type: String, required: true},
    priceMin : Number,
    priceMax : Number,
    local :  String,
    groupLocal : String,
    property : String,
    reward : String,
    created : {type: 'Date', required: true},
    author : String,
    userID : String,
    edited : {type: 'Date'},
    status : String
    });

module.exports = mongoose.model('Task', taskSchema);
