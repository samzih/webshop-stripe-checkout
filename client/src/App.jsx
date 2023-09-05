import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Confirmation from "./pages/Confirmation";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/confirmation' element={<Confirmation />} />
    </Routes>
  )
}

export default App