import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext({
    cartItems: [],
    setCartItems: () => [],
});

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    return (
        <div>
            <CartContext.Provider value={{cartItems, setCartItems}}>
                {children}
            </CartContext.Provider>
        </div>
    );
};

export default CartProvider;