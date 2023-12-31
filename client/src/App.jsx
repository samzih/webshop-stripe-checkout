import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Confirmation from "./pages/Confirmation";
import Cart from "./pages/Cart";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar';
import CartProvider from './context/CartContext';
import ProductProvider from './context/ProductContext';
import UserProvider from './context/UserContext';
import LoginModal from './components/LoginModal';
import Orders from './pages/Orders';

function App() {
  return (
    <>
      <BrowserRouter>
        <ProductProvider>
          <UserProvider>
            <CartProvider>
              <NavigationBar />
              <LoginModal />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/confirmation' element={<Confirmation />} />
                <Route path='/orders' element={<Orders />} />
              </Routes>
            </CartProvider>
          </UserProvider>
        </ProductProvider>
      </BrowserRouter>
    </>
  )
}

export default App