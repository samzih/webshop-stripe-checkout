import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import { useUserContext } from '../context/UserContext';
import { Container } from 'react-bootstrap';
import { TbLogin } from 'react-icons/tb';

function LoginModal() {
    const { show, setShow, closeModal, showModal, modalMode, setModalMode } = useUserContext();

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
                                        <Form>
                                            <Form.Group className="mb-3" controlId="loginForm.ControlInput1">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" placeholder="namn@exempel.se" autoFocus />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="loginForm.ControlInput2">
                                                <Form.Label>Lösenord</Form.Label>
                                                <Form.Control type="password" as="input" />
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Container>
                                            <Stack direction="horizontal">
                                                <div className='me-auto fst-italic' style={{ color: "darkblue", cursor: "pointer" }} onClick={() => setModalMode("register")}>
                                                    eller registrera dig...
                                                </div>
                                                <Button variant="primary" onClick={closeModal}>Logga in</Button>
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
                                        <Form>
                                            <Form.Group className="mb-3" controlId="registerForm.ControlInput1">
                                                <Form.Label>Namn</Form.Label>
                                                <Form.Control type="text" placeholder="John Doe" autoFocus />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="registerForm.ControlInput2">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" placeholder="namn@exempel.se" />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="registerForm.ControlInput3">
                                                <Form.Label>Lösenord</Form.Label>
                                                <Form.Control type="password" as="input" />
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Container>
                                            <Stack direction="horizontal">
                                                <div className='me-auto fw-medium text-muted' style={{ cursor: "pointer" }} onClick={() => setModalMode('login')}>
                                                    <TbLogin /> Logga in
                                                </div>
                                                <Button variant="primary" onClick={closeModal}>Registrera dig</Button>
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