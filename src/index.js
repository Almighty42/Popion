// React
import React from 'react';
import ReactDOM from 'react-dom/client';
// App
import App from './App';
// Apollo
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink  } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem('jwtToken');

  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    }
  }
});

const httpLink = new HttpLink({
  uri: 'https://popionbackend-almighty42.koyeb.app/graphql'
});

const cache = new InMemoryCache()

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
