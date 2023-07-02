const express = require('express');
const router = express.Router();
const itemController = require('../controller/itemController');
const verifyUser = require('../middleware/verify');
const isAdmin = require('../middleware/verifyAdmin');


router
    .post('/addItem', verifyUser, itemController.addItem)
    .delete('/removeItem', verifyUser, itemController.removeItem)
    .patch('/updateItem', verifyUser, itemController.updateItem)
    .get('/getStock', verifyUser, itemController.getStock);


module.exports = router;