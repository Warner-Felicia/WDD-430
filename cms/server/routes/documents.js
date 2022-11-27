const express = require('express');

const sequenceGenerator = require('./sequenceGenerator');
const Document = require('../models/document');

const router = express.Router();

router.get('/', (req, res, next) => {
  Document.find()
    .then(documents => {
      res.status(200).json({
        message: 'Documents fetched successfully',
        documents: documents
      })
    })
    .catch(error => {
      res.status(500).json({
        message: "Unable to get documents",
        error: error
      });
    });
});

router.post('/', (req, res, next) => {
  const maxDocumentId = sequenceGenerator.nextId('documents');

  const document = new Document({
    id: maxDocumentId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  });

  document.save()
    .then(createdDocument => {
      res.status(201).json({
        message: 'Document added sucessfully',
        document: createdDocument
      })
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      })
    });
});

router.put('/:id', (req, res, next) => {
  Document.findOne({ id: req.params.id })
    .then(document => {
      document.name = req.body.name;
      document.description = req.body.description;
      document.url = req.body.url;

      Document.updateOne({ id: req.params.id }, document)
        .then(result => {
          res.status(204).json({
            message: 'Document updated sucessfully'
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
        message: 'Document not found',
        error: error
      })
    });
});

router.delete('/:id', (req, res, next) => {
  Document.findOne({ id: req.params.id })
    .then(document => {
      Document.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: 'Document deleted successfully'
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
        message: 'Document not found',
        error: { Document: 'Document not found' }
      });
    });
});

module.exports = router;