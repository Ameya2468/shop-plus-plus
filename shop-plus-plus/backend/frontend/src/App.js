import {Routes,Route} from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import PagenotFound from "./pages/Pagenotfound.js";
import Register from "./pages/Auth/Register.js";
import Login from "./pages/Auth/Login.js";
import './App.css';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Profile from "./pages/Profile.js";
import Wishlist from "./pages/Wishlist.js";
import Orders from "./pages/Orders.js";
import PrivateRoute from "./components/PrivateRoute.js";
import Search from "./pages/Search.js"; 
import ProductDetails from "./pages/ProductDetails.js";
import CartPage from "./pages/CartPage.js";
function App() {
  return (
    <>
     <Routes>
       <Route path="/" element={<HomePage/>}/>
       <Route path="/search" element={<Search/>}/>
       <Route path="/product/:_id" element={<ProductDetails />} />
       <Route path="/cart" element={<CartPage/>}/>
       <Route path="/register" element={<Register/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route element={<PrivateRoute/>}>
         <Route path="/profile" element={<Profile/>}/>
       </Route>
       {/* <Route element={<PrivateRoute/>}>
       <Route path="/wishlist" element={<Wishlist/>}/>
       </Route> */}
       <Route element={<PrivateRoute/>}>
       <Route path="/orders" element={<Orders/>}/>
       </Route>
       <Route path="*" element={<PagenotFound/>}/>
     </Routes>
      
    </>
  );
}
export default App;

