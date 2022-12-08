const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Store', storeSchema);