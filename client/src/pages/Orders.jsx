import { useEffect } from 'react';
import { useUserContext } from '../context/UserContext';
import { Container, Stack, Card, Image, ListGroup } from 'react-bootstrap';

function Orders() {
    const { userData, userOrders, orders } = useUserContext();

    useEffect(() => {
        userOrders();
    }, [userData]);

    return (
        <>
            <Stack className='d-flex align-items-center' direction='vertical' gap={4}>
                <h1>Din orderhistorik</h1>


                {orders.map((order, id) => {
                    const { created, orderID, products, totalOrderPrice } = order;

                    const formattedDate = new Date(created * 1000).toLocaleString('sv-SE', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                    });

                    return (
                        <Card key={id}>

                            <Card.Header>
                                <Container>
                                    <Stack direction='horizontal' className='me-auto' gap={5}>
                                        <Stack direction='vertical'>
                                            <div className='fw-semibold'>Order skapad</div>
                                            <div>{formattedDate}</div>
                                        </Stack>
                                        <Stack direction='vertical'>
                                            <div className='fw-semibold'>Totalsumma</div>
                                            <div>{totalOrderPrice} kr</div>
                                        </Stack>
                                        <div className='text-muted'>{`Order #${orderID}`}</div>
                                    </Stack>
                                </Container>
                            </Card.Header>

                            <Card.Body>
                                <ListGroup variant='flush'>
                                    {products.map((product, id) => (
                                        <ListGroup.Item key={id} className='py-3'>
                                            <Stack direction='horizontal'>
                                                <Image src={product.image} width='auto' height={72} />
                                                <div className='ms-3 me-auto'>
                                                    <div className='fw-semibold'>{product.product}</div>
                                                    <div className='fw-normal'>{product.quantity} st för {product.totalPrice} kr {product.quantity > 1 && <small className='fst-italic'>({product.unitPrice} kr/st)</small>}</div>
                                                </div>
                                            </Stack>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>

                        </Card>
                    )
                })}
            </Stack>
        </>
    )
}

export default Orders