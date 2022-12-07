const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
  maxStoreId: {
    type: Number
  },
  maxItemId: {
    type: Number
  },
  maxPriceId: {
    type: Number
  },
  maxListId: {
    type: Number
  }
});

module.exports = mongoose.model('Sequence', sequenceSchema);