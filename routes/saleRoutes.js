const express = require('express');
const verifyUser = require('../middleware/verify');
const saleController = require('../controller/saleController');

const router = express.Router();

router
    .post('/updateSale', verifyUser, saleController.updateSale)
    .get('/getSales/:page', verifyUser, saleController.getSales)
    .get('/filterSales/:filterDate', verifyUser, saleController.filterSales)
    .get('/expenses', verifyUser, saleController.getExpense)
    .post('/addExpense', verifyUser, saleController.addExpense)
    .get('/expenses/:date', verifyUser, saleController.getExpenseByDate)

module.exports = router;