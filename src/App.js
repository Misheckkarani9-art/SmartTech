import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
// Pages
import Signup from './components/Signup';
import Signin from './components/Signin';
import Getproduct from './components/Getproducts';
import Makepayment from './components/Makepayment';
import Notfound from './components/Notfound';
import { useState } from 'react';
import Addproducts from './components/Addproducts';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer'










function App() {
  // Lifted search state
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        < Navbar/>
        {/* Carousel */}
       

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route 
            path="/getproducts" 
            element={<Getproduct searchQuery={searchQuery} />} 
          />
          <Route path="/addproducts" element={<Addproducts />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/makepayment" element={<Makepayment />} />
          <Route path="*" element={<Notfound />} />
         
         
          
        </Routes>

       <Footer/>
      </div>
    </Router>
  );
}

export default App;