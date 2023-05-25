const express = require('express');
const router = express.Router();
const itemController = require('../controller/itemController');
const verifyUser = require('../middleware/verify');
const isAdmin = require('../middleware/verifyAdmin');


router
    .post('/addItem', verifyUser, isAdmin, itemController.addItem)
    .delete('/removeItem', verifyUser, isAdmin, itemController.removeItem)
    .patch('/updateItem', verifyUser, isAdmin, itemController.updateItem)


module.exports = router;