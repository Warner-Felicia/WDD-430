const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  listItems: [
    {
      priceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Price',
        required: true
      }
    }
  ],
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  listType: {
    type: String,
    enum: ['purchase', 'check price'],
    required: true
  }
});

module.exports = mongoose.model('List', listSchema);