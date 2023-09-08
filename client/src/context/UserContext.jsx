import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext({
    show: false,
    setShow: false,
    closeModal: false,
    showModal: true,
    modalMode: "",
    setModalMode: "",
});

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
    const [show, setShow] = useState(false);
    const [modalMode, setModalMode] = useState("");

    const closeModal = () => setShow(false);
    const showModal = () => setShow(true);
    
    return (
        <div>
            <UserContext.Provider value={{ show, setShow, closeModal, showModal, modalMode, setModalMode }}>
                {children}
            </UserContext.Provider>
        </div>
    );
};

export default UserProvider;