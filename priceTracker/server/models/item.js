const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Item', itemSchema);