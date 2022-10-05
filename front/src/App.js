import './App.css';
import Home from './Pages/Home';
import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Clothes from './Pages/Clothes';
import Tech from './Pages/Tech';
import Product from './Pages/Product';
import Cart from './Pages/Cart';

class App extends Component {

  render() {    
    return ( 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Clothes" element={<Clothes />} />
        <Route path="/Tech" element={<Tech />} />
        <Route path="/:id" element={<Product />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    )
  }

}

export default App;

