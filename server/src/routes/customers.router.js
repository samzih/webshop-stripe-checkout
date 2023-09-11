const express = require('express');
const router = express.Router();
const { createCustomer, verifyLogin, logoutUser } = require('../controllers/customers.controller');

// Customers routes defined
router.post('/', createCustomer);

router.post('/login', verifyLogin);

router.post('/logout', logoutUser);

module.exports = router;