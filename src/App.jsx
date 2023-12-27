import Home from "./screens/Home"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./screens/Login"
import Signup from "./screens/Signup"
import { CartProvider } from "./Components/ContextReducer"
import Cart from "./screens/Cart"
import MyOrder from "./screens/MyOrder"

function App() {
  
  return (
    
      <CartProvider>
        <BrowserRouter>
      <div >
        <Routes>
          <Route path="/" element={<Home ></Home>}/>
          <Route path="/login" element={<Login></Login>}/>
          <Route path="/signup" element={<Signup></Signup>}/>
          <Route path="/myOrder" element={<MyOrder></MyOrder>}/>
        </Routes>
      </div>
      </BrowserRouter>
      </CartProvider>
      
   
  )
}

export default App
