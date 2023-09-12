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

const verifyLogin = async (req, res) => {

    const { email, password } = req.body;

    // Read users from DB
    const users = JSON.parse(await readFile(usersDB, 'utf-8'));

    // Find the user with the matching login request email
    const user = users.find(user => user.email === email);

    // If the user (email) exists in the DB, check/compare password
    if (user) {
        const correctPassword = await bcrypt.compare(password, user.password);
        if (correctPassword) {
            delete user.password;
            req.session = user;
            console.log(req.session);
            res.status(200).json(req.session);
        } else {
            res.status(401).json({ message: 'Failed to login due to wrong password' });
        }
    }

}

const logoutUser = (req, res) => {
    // Clears the cookie
    req.session = null; 
    res.status(200).json(req.session);
}

module.exports = { createCustomer, verifyLogin, logoutUser };