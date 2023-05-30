const express = require('express');
const router = express.Router();
const verifyUser = require('../middleware/verify');
const tableController=require('../controller/tableController');

router
    .post('/addTable', verifyUser, tableController.addTable)
    .patch('/updateTable', verifyUser, tableController.updateTable)
    .delete('/removeTable', verifyUser, tableController.removeTable)

module.exports = router;