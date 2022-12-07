const mongoose = require('mongoose');

const priceSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  size: {
    type: Number,
    required: false
  },
  unit: {
    type: String,
    required: false
  },
  value: {
    type: Number,
    required: true
  },
  brand: {
    type: String,
    required: false
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  },
  aisle: {
    type: String,
    required: false
  },
  lastUpdated: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Price', priceSchema);