const express = require('express');
const router = express.Router();
const customController = require('../controller/customerController');
const verifyUser = require('../middleware/verify');

router
    .get('/allCustomers/:page', verifyUser, customController.allCustomers)
    .get('/filterCustomers/:filterDate', verifyUser, customController.filterCustomers)
    .post('/addCustomer', verifyUser, customController.addCustomer)


module.exports = router;