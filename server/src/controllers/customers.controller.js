const { initStripe } = require('../stripe');
const stripe = initStripe();
const bcrypt = require('bcrypt');
const { readFile, writeFile } = require('fs/promises');
const usersDB = './src/db/users.json';

const createCustomer = async (req, res) => {

    const { name, email, password } = req.body;
    
    const customer = await stripe.customers.create({
        name: name,
        email: email,
    });

    // Only if customer object from Stripe comes back then create a new user obj and hash the password using bcrypt to then store the new user in DB
    if (customer) {
        const newUser = { name: customer.name, email: customer.email, password: '', id: customer.id };

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        newUser.password = hashedPassword;

        // Read & then write new user to DB
        try {
            const usersData = JSON.parse(await readFile(usersDB, 'utf-8'));
            usersData.push(newUser);
            await writeFile(usersDB, JSON.stringify(usersData, null, 2), 'utf-8');
            res.status(201).json({ message: `Användaren (${name}) med email: ${email} har registrerats!` });
        } catch (error) {
            console.error('Error adding user:', error);
            res.status(500).json({ error: 'Internal server error adding user' });
        }
    }

}

module.exports = { createCustomer };