import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import App from "./App.js";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import {Provider} from 'react-redux';
import { store } from './reducers';

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