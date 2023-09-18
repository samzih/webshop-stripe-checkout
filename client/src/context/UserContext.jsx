import { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const UserContext = createContext({
    show: false,
    setShow: false,
    closeModal: false,
    showModal: true,
    modalMode: "",
    setModalMode: "",
    registerUser: () => {},
    loginUser: () => {},
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    userData: {},
    setUserData: () => {},
    logoutUser: () => {},
    userOrders: () => {},
    orders: [],
});

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
    const [show, setShow] = useState(false);
    const [modalMode, setModalMode] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useLocalStorage('currentUser', null);
    const [orders, setOrders] = useState([]);

    const closeModal = () => setShow(false);
    const showModal = () => setShow(true);

    const registerUser = async (e) => {

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        // Make it an object
        const formJson = Object.fromEntries(formData.entries());

        const response = await fetch('/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formJson),
        });

        if (response.ok) {
            closeModal();
        }

        if (response.status === 409) {
            const responseData = await response.json();
            alert(responseData);
        }

    }

    const loginUser = async (e) => {

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        // Make it an object
        const formJson = Object.fromEntries(formData.entries());

        const response = await fetch('/api/customers/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formJson),
        });

        if (response.ok) {
            closeModal();
            const data = await response.json();
            setUserData(data);
            setIsLoggedIn(true);
        }
    }

    const logoutUser = async () => {
        const response = await fetch('/api/customers/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            setUserData(null);
        }
    }

    const userOrders = async () => {
        const response = await fetch('/api/customers/orders');
        const data = await response.json();
        setOrders(data);
    }

    return (
        <div>
            <UserContext.Provider value={{ show, setShow, closeModal, showModal, modalMode, setModalMode, registerUser, loginUser, isLoggedIn, setIsLoggedIn, userData, setUserData, logoutUser, userOrders, orders }}>
                {children}
            </UserContext.Provider>
        </div>
    );
};

export default UserProvider;