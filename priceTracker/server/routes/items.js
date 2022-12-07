const express = require('express');

const Item = require('../models/item');
const sequenceGenerator = require('./sequenceGenerator');

const router = express.Router();

router.get('/', (req, res, next) => {
  Item.find()
    .then(items => {
      res.status(200).json({
        message: 'Items fetched successfully',
        items: items
      })
    })
    .catch(error => {
      res.status(500).json({
        message: "Unable to get items",
        error: error
      });
    });
});

router.post('/', (req, res, next) => {
  const id = sequenceGenerator.nextId('items');

  const item = new Item({
    id: id,
    name: req.body.name,
  });
  item.save()
    .then(createdItem => {
      res.status(201).json({
        message: 'Item added sucessfully',
        item: item
      })
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred!',
        error: error
      })
    });
});

router.put('/:id', (req, res, next) => {
  Item.findOne({ id: req.params.id })
    .then(item => {
      item.name = req.body.name;
      
      Item.updateOne({ id: req.params.id }, item)
        .then(result => {
          res.status(204).json({
            message: 'Item updated sucessfully'
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Item not found',
        error: error
      })
    });
});

router.delete('/:id', (req, res, next) => {
  Item.findOne({ id: req.params.id })
    .then(item => {
      Item.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: 'Item deleted successfully'
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred',
            error: error
          });
        })
    })
    .catch(error => {
      res.status(500).json({
        message: 'Item not found',
        error: { item: 'Item not found' }
      });
    });
});

module.exports = router;