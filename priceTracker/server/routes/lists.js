const express = require('express');

const List = require('../models/list');
const sequenceGenerator = require('./sequenceGenerator');

const router = express.Router();

router.get('/', (req, res, next) => {
  List.find()
    .then(lists => {
      res.status(200).json({
        message: 'Lists fetched successfully',
        lists: lists
      })
    })
    .catch(error => {
      res.status(500).json({
        message: "Unable to get lists",
        error: error
      });
    });
});

router.post('/', (req, res, next) => {
  const id = sequenceGenerator.nextId('lists');
  const listItems = req.body.listItems.split(',');
  const list = new List({
    id: id,
    listItems: listItems,
    store: req.body.store,
    listType: req.body.listType
  });
  list.save()
    .then(createdList => {
      res.status(201).json({
        message: 'List added sucessfully',
        list: createdList
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
  const aisles = req.body.aisles.split(',');
  List.findOne({ id: req.params.id })
    .then(list => {
      list.name = req.body.name;
      list.location = req.body.location;
      list.aisles = aisles;

      List.updateOne({ id: req.params.id }, list)
        .then(result => {
          res.status(204).json({
            message: 'List updated sucessfully'
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
        message: 'List not found',
        error: error
      })
    });
});

router.delete('/:id', (req, res, next) => {
  List.findOne({ id: req.params.id })
    .then(list => {
      List.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: 'List deleted successfully'
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
        message: 'List not found',
        error: { list: 'List not found' }
      });
    });
});

module.exports = router;