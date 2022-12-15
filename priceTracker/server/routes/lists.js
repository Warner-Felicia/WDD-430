const express = require('express');

const ListItem = require('../models/list-item');
const sequenceGenerator = require('./sequenceGenerator');

const router = express.Router();

router.get('/', (req, res, next) => {
  ListItem.find()
    .populate([{
      path: 'price',
      populate: { path: 'item' }
    }, {
      path: 'price',
      populate: { path: 'store' }
    }])
    .then(listItems => {
      res.status(200).json({
        message: 'List items fetched successfully',
        listItems: listItems
      })
    })
    .catch(error => {
      res.status(500).json({
        message: "Unable to get list items",
        error: error
      });
    });
});

router.post('/', (req, res, next) => {
  const id = sequenceGenerator.nextId('lists');
  const listItem = new ListItem({
    id: id,
    price: req.body.price,
    quantity: req.body.quantity
  });
  listItem.save()
    .then(createdListItem => {
      createdListItem.populate({
        path: 'price',
        populate: { path: 'item' }
      })
        .then(fullyPopulatedListItem => {
          res.status(201).json({
            listItem: fullyPopulatedListItem
          })
        })
        .catch(error => {
          res.status(500).json({
            message: 'Unable to populate store',
            error: error
          })
        })
    })
    .catch(error => {
      res.status(500).json({
        message: 'Item not saved',
        error: error
      })
    });
});

router.put('/:id', (req, res, next) => {
  ListItem.findOne({ id: req.params.id })
    .then(listItem => {
      listItem.quantity = req.body.quantity;

      ListItem.updateOne({ id: req.params.id }, listItem)
        .then(result => {
          console.log(result);
          res.status(204).json({
            message: 'List item updated sucessfully'
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
        message: 'List item not found',
        error: error
      })
    });
});

router.delete('/:id', (req, res, next) => {
  ListItem.findOne({ id: req.params.id })
    .then(listItem => {
      ListItem.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: 'List item deleted successfully'
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
        message: 'List item not found',
        error: { listItem: 'List item not found' }
      });
    });
});

router.delete('/', (req, res, next) => {
  ListItem.collection.drop()
    .then(result => {
      res.status(200).json({
        message: 'List items successfully deleted'
      })
    });
})

module.exports = router;