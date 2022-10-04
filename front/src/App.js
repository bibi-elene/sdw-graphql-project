import './App.css';
import Home from './Pages/Home';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Clothes from './Pages/Clothes';
import Tech from './Pages/Tech';
import Product from './Pages/Product';
import { useParams } from 'react-router-dom';

class App extends Component {

  render() {    
    return ( 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Clothes" element={<Clothes />} />
        <Route path="/Tech" element={<Tech />} />
        <Route path="/:id" element={<Product />} />
      </Routes>
    )
  }

}

export default App;

