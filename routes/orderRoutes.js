const express = require('express');
const orderController = require('../controller/orderController');
const verifyUser = require('../middleware/verify');
const router = express.Router();

router
    .get('/customerOrder/:cid', verifyUser, orderController.getCustomerOrder)
    .post('/orderItem', verifyUser, orderController.addToOrder)
    .post('/completeOrder', verifyUser, orderController.completeOrder)
    .delete('/removeItem', verifyUser, orderController.removeItem)

module.exports = router;