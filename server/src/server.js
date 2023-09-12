// Includes modules
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');

// Include routes
const checkoutRouter = require('./routes/checkout.router');
const productsRouter = require('./routes/products.router');
const customersRouter = require('./routes/customers.router');


const CLIENT_URL = 'http://localhost:5173';
const app = express();


// Apply middlewares globally or to specific routes
app.use(cors({
    origin: CLIENT_URL,
}));

app.use(express.json());

app.use(cookieSession({
    name: 'session',
    keys: ['s3cR3tK3y'],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: false,
    httpOnly: true,
}));


// Use included routes
app.use('/api/checkout', checkoutRouter);

app.use('/api/products', productsRouter);

app.use('/api/customers', customersRouter);


app.listen(3000, () => console.log('Server up & running on port 3000...'));
