import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import { useUserContext } from '../context/UserContext';
import { Container } from 'react-bootstrap';
import { TbLogin } from 'react-icons/tb';


function LoginModal() {
    const { show, setShow, closeModal, showModal, modalMode, setModalMode, registerUser, loginUser } = useUserContext();


    const handleRegister = (e) => {
        // Prevent the browser from reloading the page
        e.preventDefault();
        
        // If built in browser validation passes then register user
        if (e.currentTarget.checkValidity()) {
            registerUser(e);
        }
    }

    const handleLogin = (e) => {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // If built in browser validation passes then try to login user
        if (e.currentTarget.checkValidity()) {
            loginUser(e);
        }
    }


    return (
        <>
            {(modalMode === "login" || modalMode === "register") &&
                (
                    <Modal show={show} onHide={closeModal}>
                        {modalMode === "login" ?
                            (
                                <>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Logga in</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form id='login-form' onSubmit={handleLogin}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control name='email' required type="email" placeholder="namn@exempel.se" autoFocus />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Lösenord</Form.Label>
                                                <Form.Control name='password' required type="password" as="input" />
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Container>
                                            <Stack direction="horizontal">
                                                <div className='me-auto fst-italic' style={{ color: "darkblue", cursor: "pointer" }} onClick={() => setModalMode("register")}>
                                                    eller registrera dig...
                                                </div>
                                                <Button variant="primary" form='login-form' type='submit'>Logga in</Button>
                                            </Stack>
                                        </Container>
                                    </Modal.Footer>
                                </>
                            )
                            :
                            modalMode === "register" &&
                            (
                                <>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Registrera dig</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form id='register-form' onSubmit={handleRegister}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Namn</Form.Label>
                                                <Form.Control required name='name' type="text" placeholder="John Doe" autoFocus />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control required name='email' type="email" placeholder="namn@exempel.se" />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Lösenord</Form.Label>
                                                <Form.Control required name='password' type="password" />
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Container>
                                            <Stack direction="horizontal">
                                                <div className='me-auto fw-medium text-muted' style={{ cursor: "pointer" }} onClick={() => setModalMode('login')}>
                                                    <TbLogin /> Logga in
                                                </div>
                                                <Button variant="primary" form='register-form' type='submit'>Registrera dig</Button>
                                            </Stack>
                                        </Container>
                                    </Modal.Footer>
                                </>
                            )
                        }
                    </Modal>
                )
            }
        </>
    )
}

export default LoginModal