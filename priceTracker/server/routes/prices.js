const express = require('express');

const Price = require('../models/price');
const Item = require('../models/item');
const Store = require('../models/store');

const sequenceGenerator = require('./sequenceGenerator');

const router = express.Router();

router.get('/', (req, res, next) => {
  Price.find()
    .populate('item')
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

router.get('/:id', (req, res, next) => {
  Price.findOne({ id: req.params.id })
    .populate('item')
    .populate('store')
      .then(price => {
        res.status(200).json({
          message: 'Price fetched',
          price: price
        })
      })
})

router.post('/', (req, res, next) => {
  const id = sequenceGenerator.nextId('prices');
  let itemId;
  let storeId;

  Item.findOne({ id: req.body.item })
    .then(item => {
      itemId = item._id;
      Store.findOne({ id: req.body.store })
        .then(store => {
          storeId = store._id;
          const price = new Price({
            id: id,
            item: itemId,
            size: req.body.size,
            unit: req.body.unit,
            value: req.body.value,
            unitPrice: req.body.unitPrice,
            store: storeId,
            brand: req.body.brand,
            aisle: req.body.aisle,
            lastUpdated: new Date()
          })
          price.save()
            .then(createdPrice => {
              createdPrice.populate('item')
              .then(itemPopulated => {
                itemPopulated.populate('store')
                  .then(populatedPrice => {
                    res.status(201).json({
                      message: 'Price added sucessfully',
                      price: populatedPrice
                    })
                  })
              })              
            })
            .catch(error => {
              res.status(500).json({
                message: 'Error, unable to save price',
                error: error
              })
            })
        })
        .catch(error => {
          res.status(500).json({
            message: 'Unable to retrieve store',
            error: error
          })
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Unable to retrieve item',
        error: error
      })
    })
});

router.put('/:id', (req, res, next) => {
  Price.findOne({ id: req.params.id })
    .then(price => {
      price.item = req.body.item;
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