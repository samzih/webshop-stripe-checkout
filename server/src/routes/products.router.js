const express = require('express');
const router = express.Router();
const { listAllProducts } = require('../controllers/products.controller');

// Checkout routes defined
router.get('/', listAllProducts);

module.exports = router;
