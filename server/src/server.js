// Includes modules
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Include routes
const checkoutRouter = require('./routes/checkout.router');
const productsRouter = require('./routes/products.router');


const CLIENT_URL = 'http://localhost:5173';
const app = express();


// Apply middlewares globally or to specific routes
app.use(cors({
    origin: CLIENT_URL,
}));

app.use(express.json());


// Use included routes
app.use('/api/create-checkout-session', checkoutRouter);

app.use('/api/', productsRouter);


app.listen(3000, () => console.log('Server up & running on port 3000...'));
