const express = require('express');
const router = express.Router();
const customController = require('../controller/customerController');
const verifyUser = require('../middleware/verify');

router
    .get('/allCustomers', customController.allCustomers)
    .post('/addCustomer', customController.addCustomer)


module.exports = router;