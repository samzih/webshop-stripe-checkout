const { initStripe } = require('../stripe');
const stripe = initStripe();
const bcrypt = require('bcrypt');

const createCustomer = async (req, res) => {

    console.log(req.body);

    const { name, email, password } = req.body;
    
    const customer = await stripe.customers.create({
        name: name,
        email: email,
    });

    // If everything goes well and the customer is created on stripe
    if (customer) {

        const newUser = { name: customer.name, email: customer.email, password: 'password', id: customer.id } // name, email, password (hashed), id (customer.id, looks like this: cus_ObLp3Od2JT15uJ)
        
        // Only if customer object comes back then we want to hash the password from req.body using bcrypt
        (async () => {
            // (auto-gen a salt and hash):
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log('Hashed password', hashedPassword);
            // Store hash in your password DB. (first store into newUser object with dot notation like this: newUser.password = hashedPassword)
        })();

        // Write in {} with fs (file system) to our users.json db (remeber to first use fs.readFile then fs.writeFile)
        
        
    }

    // console.log(customer.id, customer.name, customer.email);
    res.status(201).json(`Användaren (${name}) med email: ${email} har registrerats!`);
    
}

module.exports = { createCustomer };