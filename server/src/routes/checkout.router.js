const express = require('express');
const router = express.Router();
const { initStripeSession, verifyStripeSession } = require('../controllers/checkout.controller');

// Checkout routes defined
router.post('/create-session', initStripeSession);

router.post('/verify-session', verifyStripeSession);

module.exports = router;