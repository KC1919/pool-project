const express = require('express');
const verifyUser = require('../middleware/verify');
const saleController = require('../controller/saleController');

const router = express.Router();

router
    .post('/updateSale', verifyUser, saleController.updateSale)
    .get('/getSales/:page', verifyUser, saleController.getSales)
    .get('/filterSales/:filterDate', verifyUser, saleController.filterSales);

module.exports = router;