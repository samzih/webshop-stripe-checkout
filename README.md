# Webshop with Stripe Checkout integration

### Link to GitHub repo: https://github.com/samzih/webshop-stripe-checkout

### Project description:
This is a simple webshop with Stripe integration for the checkout process. It's built using NodeJS & Express on the backend and React on the frontend. The main purpose of this project was to integrate a third-party system into a fullstack web application.

### How to (build and) run the application:
***Prerequisites:*** You will need NodeJS installed.

1. Install all the necessary dependencies using `npm install` in both the server/ and client/ directories
2. In the server/ directory create a *.env* file & inside of it type: `SECRET_STRIPE_KEY=` and after the Stripe API key
3. While being located in the server/ directory start the server with `npm run start`
4. Then change into the client/ directory and start the React app with `npm run dev`
5. Navigate to [**localhost:5173**](http://localhost:5173) on your preferred web browser to see the webshop in action!