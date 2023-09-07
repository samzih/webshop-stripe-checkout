import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Confirmation from "./pages/Confirmation";
import Cart from "./pages/Cart";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar';
import CartProvider from './context/CartContext';
import ProductProvider from './context/ProductContext';

function App() {
  return (
    <>
      <BrowserRouter>
        <ProductProvider>
          <CartProvider>
            <NavigationBar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/confirmation' element={<Confirmation />} />
            </Routes>
          </CartProvider>
        </ProductProvider>
      </BrowserRouter>
    </>
  )
}

export default App