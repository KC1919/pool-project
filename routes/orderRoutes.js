const express = require('express');
const orderController = require('../controller/orderController');
const verifyUser = require('../middleware/verify');
const router = express.Router();

router
    .get('/orderItem/:cid', verifyUser, orderController.getCustomerOrder)
    .post('/addItem', verifyUser, orderController.addToOrder)
    .post('/completeOrder', verifyUser, orderController.completeOrder)

module.exports = router;