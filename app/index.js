import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './components/app.global.css';

const store = configureStore();

const client = new ApolloClient({
  request: async (operation) => {
    const { token } = localStorage;
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },
  onError: () => {
    history.push('/');
  },
  uri: 'http://localhost:3333/graphql'
});

render(
  <ApolloProvider client={client}>
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>
  </ApolloProvider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <ApolloProvider client={client}>
        <AppContainer>
          <NextRoot store={store} history={history} />
        </AppContainer>
      </ApolloProvider>,
      document.getElementById('root')
    );
  });
}
