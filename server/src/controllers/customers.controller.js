const { initStripe } = require('../stripe');
const stripe = initStripe();

const createCustomer = async (req, res) => {

    console.log(req.body);

    const { name, email, password } = req.body;
    
    const customer = await stripe.customers.create({
        name: name,
        email: email,
    });

    // If everything goes well and the customer is created on stripe
    if (customer) {
        // Only if customer object comes back then we want to hash the password from req.body using (bcrypt?)
        // We want to write in {} with fs (file system) to our users.json db (remeber to first use fs.readFile then fs.writeFile)
        const newUser = {} // name, email, password (hashed), id (customer.id, looks like this: cus_ObLp3Od2JT15uJ)
        
    }

    // console.log(customer.id, customer.name, customer.email);
    res.status(201).json(`Användaren (${name}) med email: ${email} har registrerats!`);
    
}

module.exports = { createCustomer };