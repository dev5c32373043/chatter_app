import React from 'react';
import PropTypes from 'prop-types';

import AuthForm from '../components/forms/Auth';

const SignIn = props => <AuthForm history={props.history} action="signIn" nextAction="SignUp" />;

SignIn.propTypes = {
  history: PropTypes.object.isRequired,
};

export default SignIn;
