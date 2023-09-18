import { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext({
    products: [],
    setProducts: () => [],
    fetchProducts: () => {},
});

export const useProductContext = () => useContext(ProductContext);

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    // Fetch product data
    async function fetchProducts() {
        const response = await fetch('/api/products');
        const data = await response.json();
        
        setProducts(data.data)
    }

    return (
        <div>
            <ProductContext.Provider value={{fetchProducts, products, setProducts}}>
                {children}
            </ProductContext.Provider>
        </div>
    );
};

export default ProductProvider;