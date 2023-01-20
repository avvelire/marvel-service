import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

import './style/style.scss';

const client = new ApolloClient({
  uri: 'http://localhost:5001/api/v1',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
