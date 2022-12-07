const express = require('express');

const Store = require('../models/store');
const sequenceGenerator = require('./sequenceGenerator');

const router = express.Router();

router.get('/', (req, res, next) => {
  Store.find()
    .then(stores => {
      res.status(200).json({
        message: 'Stores fetched successfully',
        stores: stores
      })
    })
    .catch(error => {
      res.status(500).json({
        message: "Unable to get stores",
        error: error
      });
    });
});

router.post('/', (req, res, next) => {
    const id = sequenceGenerator.nextId('stores');
    const aisles = req.body.aisles.split(',');

    const store = new Store({
        id: id,
        name: req.body.name,
        location: req.body.location,
        aisles: aisles
    });
  store.save()
    .then(createdContact => {
      res.status(201).json({
        message: 'Store added sucessfully',
        contact: store
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
  Store.findOne({ id: req.params.id })
    .then(store => {
      store.name = req.body.name;
      store.location = req.body.location;
      store.aisles = aisles;
      
      Store.updateOne({ id: req.params.id }, store)
        .then(result => {
          res.status(204).json({
            message: 'Store updated sucessfully'
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
        message: 'Store not found',
        error: error
      })
    });
});

router.delete('/:id', (req, res, next) => {
  Store.findOne({ id: req.params.id })
    .then(store => {
      Store.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: 'Store deleted successfully'
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
        message: 'Store not found',
        error: { store: 'Store not found' }
      });
    });
});

module.exports = router;