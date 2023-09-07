const { initStripe } = require('../stripe');
const stripe = initStripe();
const CLIENT_URL = 'http://localhost:5173';


const listAllProducts = async (req, res) => {
    try {
        
        const products = await stripe.products.list({
            limit: 8,
            active: true,
            expand: ['data.default_price'],
        });

        res.status(200).json(products);

    } catch (error) {

        console.log(error.message);
        res.status(400).send(`There seems to be a problem with listing all the products from stripe. <br> ERROR MESSAGE: ${error.message}`);

    }
}


module.exports = { listAllProducts };
