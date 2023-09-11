const { initStripe } = require('../stripe');
const stripe = initStripe();
const CLIENT_URL = 'http://localhost:5173';


const initStripeSession = async (req, res) => {
    if (Object.keys(req.session).length > 0) {
        try {
            const session = await stripe.checkout.sessions.create({
                line_items: req.body.map(item => (
                    {
                        price: item.product,
                        quantity: item.quantity
                    }
                )),
                allow_promotion_codes: true,
                mode: 'payment',
                success_url: `${CLIENT_URL}/confirmation`,
                cancel_url: `${CLIENT_URL}/cart`,
            });

            res.status(200).json({ url: session.url });
        } catch (error) {
            console.log(error.message);
            res.status(400).json('It did NOT go well with creating a stripe checkout session!');
        }
    }
};


module.exports = { initStripeSession };