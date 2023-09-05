function Home() {

    // A cart in a state (and prob in local storage incase user refreshes page) to then send with handepayment POST
    const cart = [
        {
            product: 'price_1NmfbbJXjIEuO6pocKStrou0',
            quantity: 2,
        },
    ]

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
            <button onClick={handlePayment}>GÖR ETT KÖP</button>
        </>
    )
}

export default Home