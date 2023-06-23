const express = require('express');
const verifyUser = require('../middleware/verify');
const router = express.Router();
const membershipController = require('../controller/membershipController');
const {
    verify
} = require('jsonwebtoken');

router
    .post('/addMembership', verifyUser, membershipController.addMembership)
    .patch('/addCredit', verifyUser, membershipController.addCredit)
    .post('/applyMembership', verifyUser, membershipController.applyMembership)
    .delete('/removeMembership', verifyUser, membershipController.removeMembership)

module.exports = router;