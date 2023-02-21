import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from "./components/Register"
import Login from "./components/Login"
import Home from './components/Home';
import PageNotFound from "./components/PageNotFound"
import Header from "./components/Header"
import Profile from './components/Profile';
import ProductDetail from './components/ProductDetail';
import UploadProduct from './components/UploadProduct';
import MyProduct from './components/MyProduct'
import PurchasedProduct from './components/PurchasedProduct';
import Footer from './components/Footer';
function App() {
  
  return (
    <>
    <Header />
    <BrowserRouter>
      <Routes>
        {
          localStorage.getItem('token') ?
          <>
          <Route path="/" element={<Home />} />
          <Route path='/upload-product' element={<UploadProduct />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/my-product" element={<MyProduct />}/>
          <Route path="/purchased" element={<PurchasedProduct />}/>
          <Route path='/product-details/:productId' element={<ProductDetail />}/>
          </>
          :
          <>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/> 
          </>
        }
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    <Footer />
    </>
  );
}

export default App;
