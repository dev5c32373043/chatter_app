import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Chat from './pages/Chat';
import NotFound from './pages/NotFound';

const Router = props => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute exact path="/" component={Chat} parentProps={{ ...props }} />
      <Route exact path="/sign_in" component={SignIn} />
      <Route exact path="/sign_up" component={SignUp} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
