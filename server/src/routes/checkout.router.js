const express = require('express');
const router = express.Router();
const { initStripeSession } = require('../controllers/checkout.controller');

// Checkout routes defined
router.post('/create-session', initStripeSession);

module.exports = router;