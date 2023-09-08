import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Container, Stack, Image } from 'react-bootstrap';
import { useCartContext } from '../context/CartContext';

function Cart() {
  const { cartItems, setCartItems, cartTotalPrice } = useCartContext();

  console.log(cartItems);

  // stores the cart with product and quantity ready to be sent to stripe [{ product: 'price_1Nn1F5JXjIEuO6poPZjEdhCJ', quantity: 2 },]
  const cart = cartItems.map((item) => (
    { product: item.product.default_price.id, quantity: item.quantity }
  ));

  console.log(cart);

  async function handlePayment() {
      const response = await fetch('/api/checkout/create-session', {
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
      <Stack className="d-flex align-items-center" direction="vertical" gap={3}>

        <h1>Din kundvagn</h1>

        {cartItems.map((item, id) => (
          <div key={id} style={{ border: "1px solid lightgrey", padding: "1.25rem", borderRadius: "5px" }}>
            <Stack style={{ width: "40rem" }} direction="horizontal" gap={3}>
              <Image style={{ width: "75px" }} fluid src={item.product.images[0]} />
              <Stack className="justify-content-center" direction="vertical" gap={0}>
                <Stack direction="horizontal" gap={1}>
                  <h5>{item.product.name}</h5>
                  {item.quantity > 1 && (<h6 className="text-muted">{`x${item.quantity}`}</h6>)}
                </Stack>
                <h6 className="text-muted">{`${item.product.default_price.unit_amount / 100} kr`}<small> (per enhet)</small></h6>
              </Stack>
              <h4>{`${(item.product.default_price.unit_amount / 100) * item.quantity} kr`}</h4>
            </Stack>
          </div>
        ))}

        <h1>Totalpris: {cartTotalPrice} kr</h1>

      </Stack>

      <Button onClick={handlePayment}>GÖR ETT KÖP</Button>
    </>
  )
}

export default Cart