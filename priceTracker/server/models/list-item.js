const mongoose = require('mongoose');

const listItemSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  price: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Price',
    required: true
  },
  quantity: {
  type: Number,
  required: true
}
  
});

module.exports = mongoose.model('ListItem', listItemSchema);