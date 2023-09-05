const express = require('express');
const router = express.Router();
const { initStripeSession } = require('../controllers/checkout.controller');

// Checkout routes defined
router.post('/', initStripeSession);

module.exports = router;