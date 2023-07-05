const express = require('express');
const router = express.Router();
const verifyUser = require('../middleware/verify');
const tableController=require('../controller/tableController');
const isAdmin = require('../middleware/verifyAdmin');

router
    .post('/addTable', verifyUser, tableController.addTable)
    .patch('/updateTable', verifyUser, tableController.updateTable)
    .delete('/removeTable', verifyUser, isAdmin, tableController.removeTable)

module.exports = router;