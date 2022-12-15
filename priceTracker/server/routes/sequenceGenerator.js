var Sequence = require('../models/sequence');

var maxStoreId;
var maxItemId;
var maxPriceId;
var maxListId;
var sequenceId = null;

function SequenceGenerator() {

  Sequence.findOne()
    .exec(function (err, sequence) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }

      sequenceId = sequence._id;
      maxStoreId = sequence.maxStoreId;
      maxItemId = sequence.maxItemId;
      maxPriceId = sequence.maxPriceId;
      maxListId = sequence.maxListId;
    });
}

SequenceGenerator.prototype.nextId = function (collectionType) {
  console.log(collectionType);

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'stores':
      maxStoreId++;
      updateObject = { maxStoreId: maxStoreId };
      nextId = maxStoreId;
      break;
    case 'items':
      maxItemId++;
      updateObject = { maxItemId: maxItemId };
      nextId = maxItemId;
      break;
    case 'prices':
      maxPriceId++;
      updateObject = { maxPriceId: maxPriceId };
      nextId = maxPriceId;
      break;
    case 'lists':
      maxListId++;
      updateObject = { maxListId: maxListId };
      nextId = maxListId;
      break;
    default:
      return -1;
  }

  Sequence.update({ _id: sequenceId }, { $set: updateObject },
    function (err) {
      if (err) {
        console.log("nextId error = " + err);
        return null;
      }
    });

  return nextId;
};

module.exports = new SequenceGenerator();
