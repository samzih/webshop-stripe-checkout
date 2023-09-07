import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { useCartContext } from '../context/CartContext';

function Cart() {
  const { cartItems, setCartItems } = useCartContext();

  console.log(cartItems);

  // stores the cart with product and quantity ready to be sent to stripe [{ product: 'price_1Nn1F5JXjIEuO6poPZjEdhCJ', quantity: 2 },]
  const cart = cartItems.map((item) => (
    { product: item.product.default_price.id, quantity: item.quantity }
  ));

  console.log(cart);

  async function handlePayment() {
      const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(cart),
      });

      if (!response.ok) {
          return
      }

      const { url } = await response.json();
      window.location = url;
  }
  
  return (
    <>
      <div>Cart</div>


      <Button onClick={handlePayment}>GÖR ETT KÖP</Button>
    </>
  )
}

export default Cart