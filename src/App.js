import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Signup from './components/Signup';
import Getproduct from './components/Getproducts';
import Addproducts from './components/Addproducts';
import Makepayment from './components/Makepayment';
import Notfound from './components/Notfound';
import Signin from './components/Signin';
import Mycarousel from './components/Mycarousel';
import Navbar from './components/Navbar'; // ✅ import navbar
import Products from './components/Products';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar at the top */}
        <Navbar />

        {/* Optional welcome header */}
        <header className="App-header text-center py-3 bg-light">
          <h2>
            Welcome to Prime-Car Accessories- “Innovation Meets Convenience
          </h2>
        </header>

        {/* Carousel below header */}
       

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Getproduct />} />
          <Route path="/addproducts" element={<Addproducts />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/makepayment" element={<Makepayment />} />
          <Route path="/products" element={<Products />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;