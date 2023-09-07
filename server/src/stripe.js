const initStripe = () => {
    const Stripe = require('stripe');
    return Stripe(process.env.SECRET_STRIPE_KEY);
};

module.exports = { initStripe };