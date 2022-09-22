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


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

class App extends Component {

  render() {
    return (
    <Home />
    )
  }

}

export default App;

