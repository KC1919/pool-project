const express = require('express');
const router = express.Router();
const customController = require('../controller/customerController');

router
    .post('/addItem', customController.addItem)
    .delete('/removeItem/:id', customController.removeItem)
    .patch('/updateItem', customController.updateItem)


module.exports = router;