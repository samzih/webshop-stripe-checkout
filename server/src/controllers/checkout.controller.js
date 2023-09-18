const { initStripe } = require('../stripe');
const stripe = initStripe();
const CLIENT_URL = 'http://localhost:5173';
const { readFile, writeFile } = require('fs/promises');
const ordersDB = './src/db/orders.json';


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
                customer: req.session.id,
                allow_promotion_codes: true,
                mode: 'payment',
                success_url: `${CLIENT_URL}/confirmation`,
                cancel_url: `${CLIENT_URL}/cart`,
            });

            res.status(200).json({ url: session.url, sessionId: session.id });
        } catch (error) {
            console.log(error.message);
            res.status(400).json('It did NOT go well with creating a stripe checkout session!');
        }
    }
};

const verifyStripeSession = async (req, res) => {
    try {
        // Retrieve a checkout session
        const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);

        // Exit code block if the session order has not been paid for
        if (session.payment_status !== 'paid') {
            return res.status(400).json({ verified: false });
        }

        const line_items = await stripe.checkout.sessions.listLineItems(req.body.sessionId);

        const productPromises = line_items.data.map(async item => {
            const product = await stripe.products.retrieve(item.price.product);

            return {
                totalPrice: item.amount_total / 100,
                discount: item.amount_discount,
                product: item.description,
                unitPrice: item.price.unit_amount / 100,
                quantity: item.quantity,
                image: product.images[0],
            };
        });

        // Use Promise.all to wait for all promises to resolve
        const products = await Promise.all(productPromises);

        const order = {
            customerID: session.customer,
            orderID: (session.payment_intent).substring(3),
            name: session.customer_details.name,
            created: session.created,
            totalOrderPrice: session.amount_total / 100,
            products: products, // Assign the resolved array of products
        };

        // Save the order to DB
        const ordersData = JSON.parse(await readFile(ordersDB, 'utf-8'));
        ordersData.push(order);
        await writeFile(ordersDB, JSON.stringify(ordersData, null, 2), 'utf-8');
        res.status(200).json({ verified: true });
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = { initStripeSession, verifyStripeSession };