import { useState, useEffect } from 'react';
import { useCartContext } from '../context/CartContext';

function Confirmation() {
  const { setCartItems } = useCartContext();
  const [isPaymentVerified, setIsPaymentVerified] = useState(false);

  const verifyPayment = async () => {
    const sessionId = sessionStorage.getItem('stripe-session-id');

    // check if we got a sessionid first before doing a verify ect..
    if (sessionId === null) { 
      return 
    }

    const response = await fetch('/api/checkout/verify-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId }),
    });

    const { verified } = await response.json();

    if (verified) {
      setIsPaymentVerified(true);
      sessionStorage.removeItem('stripe-session-id');
      setCartItems([]);
    } else {
      setIsPaymentVerified(false);
    }
  }

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    isPaymentVerified ? (<div>Tack för ditt köp!</div>) : (<div>Något gick fel med betalningen...</div>)
  )
}

export default Confirmation