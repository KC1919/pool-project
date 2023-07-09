const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router
    .get('/login', authController.getLogin)
    .post('/register', authController.register)
    .post('/login', authController.login)
    .post('/logout',authController.logout)


module.exports = router;