var mongoose = require('mongoose');

var catSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  color: String
});

var Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;
