import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...args }) => {
  const isAuthenticated = args.location.state || args.parentProps.isAuthenticated;
  return (
    <Route
      {...args}
      render={props =>
        (isAuthenticated ? (
          <Component {...args.parentProps} {...props} />
        ) : (
          <Redirect to="/sign_in" />
        ))
      }
    />
  );
};
PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
