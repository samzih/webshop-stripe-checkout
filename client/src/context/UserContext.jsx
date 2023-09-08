import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext({
    show: false,
    setShow: false,
    closeModal: false,
    showModal: true,
    modalMode: "",
    setModalMode: "",
    registerUser: () => {},
});

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
    const [show, setShow] = useState(false);
    const [modalMode, setModalMode] = useState("");

    const closeModal = () => setShow(false);
    const showModal = () => setShow(true);

    const registerUser = async (e) => {

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        // Or you can work with it as a plain object
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);


        const response = await fetch('/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify(formJson), // Convert the object to JSON
        });

        if (response.ok) {
            closeModal();
            const responseData = await response.json();
            console.log(responseData);
        }

    }
    
    return (
        <div>
            <UserContext.Provider value={{ show, setShow, closeModal, showModal, modalMode, setModalMode, registerUser }}>
                {children}
            </UserContext.Provider>
        </div>
    );
};

export default UserProvider;