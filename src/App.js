import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup';
import Getproduct from './components/Getproducts';
import Addproducts from './components/Addproducts';
import Makepayment from './components/Makepayment';
import Notfound from './components/Notfound';
import Signin from './components/Signin';

function App() {
  return (
   <Router>
     <div className="App">
      <header className="App-header">
        <img src="" alt="" className='logo'/>
        
        <h2>Welcome to Smart-Gadgets - Your decency is our pride</h2>
     
      </header>
      <Routes>
        
        <Route path="/signup" element={<Signup/>} />  
        <Route path="/" element={<Getproduct/>} />   
        <Route path="/addproducts" element={<Addproducts/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/makepayment" element={<Makepayment/>}/>
        <Route path="*" element={<Notfound/>} />
      </Routes>
    </div>
   </Router>
  );
}

export default App;
