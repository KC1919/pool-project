const express = require('express');
const verifyUser = require('../middleware/verify');
const router = express.Router();
const membershipController = require('../controller/membershipController');
const isAdmin = require('../middleware/verifyAdmin');

router
    .post('/addMembership', verifyUser, isAdmin, membershipController.addMembership)
    .patch('/addCredit', verifyUser, isAdmin, membershipController.addCredit)
    .post('/applyMembership', verifyUser, membershipController.applyMembership)
    .delete('/removeMembership', verifyUser, isAdmin, membershipController.removeMembership)
    .get('/getMemberships', verifyUser, membershipController.getMembership);

module.exports = router;