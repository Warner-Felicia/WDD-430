const express = require('express');

const Price = require('../models/price');
const Item = require('../models/item');

const sequenceGenerator = require('./sequenceGenerator');

const router = express.Router();

router.get('/', (req, res, next) => {
  Price.find()
    .populate('name')
    .populate('store')
    .then(prices => {
      res.status(200).json({
        message: 'Prices fetched successfully',
        prices: prices
      })
    })
    .catch(error => {
      res.status(500).json({
        message: "Unable to get prices",
        error: error
      });
    });
});

router.post('/', (req, res, next) => {
  const id = sequenceGenerator.nextId('prices');

  const price = new Price({
    id: id,
    name: req.body.name,
    size: req.body.size,
    unit: req.body.unit,
    value: req.body.value,
    store: req.body.store,
    brand: req.body.brand,
    aisle: req.body.aisle,
    lastUpdated: new Date()
  });
  price.save()
    .then(createdPrice => {
      res.status(201).json({
        message: 'Price added sucessfully',
        price: createdPrice
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
  Price.findOne({ id: req.params.id })
    .then(price => {
      price.name = req.body.name;
      price.size = req.body.size;
      price.unit = req.body.unit;
      price.value = req.body.value;
      price.brand = req.body.brand;
      price.store = req.body.store;
      price.aisle = req.body.aisle;
      price.lastUpdated = new Date();

      Price.updateOne({ id: req.params.id }, price)
        .then(result => {
          res.status(204).json({
            message: 'Price updated sucessfully'
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
        message: 'Price not found',
        error: error
      })
    });
});

router.delete('/:id', (req, res, next) => {
  Price.findOne({ id: req.params.id })
    .then(price => {
      Price.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: 'Price deleted successfully'
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
        message: 'Price not found',
        error: { price: 'Price not found' }
      });
    });
});

module.exports = router;