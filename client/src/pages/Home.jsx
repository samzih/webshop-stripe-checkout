import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { useCartContext } from '../context/CartContext';
import { useProductContext } from '../context/ProductContext';

function Home() {
    const { products, setProducts, fetchProducts } = useProductContext();
    const { cartItems, setCartItems } = useCartContext();

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleClick = (product) => {
        // Check if the product already exists in the cartItems array
        const existingProduct = cartItems.find(item => item.product.id === product.id);

        // If the product exists increment the quantity, else add it to the array with a quantity of 1
        if (existingProduct) {
            existingProduct.quantity++;
            setCartItems([...cartItems]);
        } else {
            setCartItems([...cartItems, { product: product, quantity: 1 }]);
        }
    }

    return (
        <>
            <Container>
                <Row xs={1} md={4} className="g-5">
                    {products.map((product, id) => (
                        <Col key={id}>
                            <Card style={{ width: '18rem', height: '100%' }}>
                                <Card.Img style={{ width: "150px" }} variant="top" src={product.images[0]} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Subtitle>{`${product.default_price.unit_amount / 100} kr`}</Card.Subtitle>
                                    <Card.Text>{product.description}</Card.Text>
                                    <Button onClick={() => handleClick(product)} variant="secondary">Lägg i varukorg</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default Home