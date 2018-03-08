/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import LogIn from './components/LogIn';
import Applications from './components/Applications';

export default () => (
  <App>
    <Switch>
      <Route path="/applications" component={Applications} />
      <Route path="/" component={LogIn} />
    </Switch>
  </App>
);
