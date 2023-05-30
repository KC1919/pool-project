const express = require('express');
const verifyUser = require('../middleware/verify');
const saleController = require('../controller/saleController');

const router = express.Router();

router
    .post('/updateSale', verifyUser, saleController.updateSale);

module.exports = router;