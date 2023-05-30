const express = require('express');
const verifyUser = require('../middleware/verify');
const router = express.Router();
const membershipController = require('../controller/membershipController');

router
    .post('/addMembership', verifyUser, membershipController.addMembership)
    .patch('/addCredit', verifyUser, membershipController.addCredit)

module.exports = router;