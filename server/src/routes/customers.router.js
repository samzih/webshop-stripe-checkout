const express = require('express');
const router = express.Router();
const { createCustomer } = require('../controllers/customers.controller');

// Customers routes defined
router.post('/', createCustomer);

module.exports = router;