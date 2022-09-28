import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import App from "./App.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import {Provider} from 'react-redux';
import {legacy_createStore as createStore} from 'redux';

const currencyState = {
  currency: ""
}

const reducer = (state = currencyState, action) => {
  switch(action.type) {
    case "USD":
      return {currency: state.currency = "USD"};

    case "GBP":
      return {currency: state.currency = "GBP"};

    case "AUD":
      return {currency: state.currency = "AUD"};

    case "JPY":
      return {currency: state.currency = "JPY"};

    case "RUB":
      return {currency: state.currency = "RUB"};

    default: 
      return {currency: state.currency = "USD"};
  }
}

const store = createStore(reducer);

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client}>
        <Provider store={store}>
        <App />
        </Provider>
    </ApolloProvider>
    </Router>
  </React.StrictMode>
);