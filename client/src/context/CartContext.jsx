import { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CartContext = createContext({
    cartItems: [],
    setCartItems: () => [],
    cartTotalPrice: 0,
});

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useLocalStorage('cart', []);

    // Calculate total price of all cart items (incl. quantity)
    const cartTotalPrice = cartItems.reduce((acc, currentItem) => (
        acc + (currentItem.product.default_price.unit_amount / 100) * currentItem.quantity
    ), 0);

    return (
        <div>
            <CartContext.Provider value={{cartItems, setCartItems, cartTotalPrice}}>
                {children}
            </CartContext.Provider>
        </div>
    );
};

export default CartProvider;