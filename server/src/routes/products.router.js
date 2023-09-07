const express = require('express');
const router = express.Router();
const { listAllProducts } = require('../controllers/products.controller');

// Checkout routes defined
router.get('/products', listAllProducts);

module.exports = router;
