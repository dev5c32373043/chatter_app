import React from 'react';
import PropTypes from 'prop-types';

import AuthForm from '../components/forms/Auth';

const SignUp = props => <AuthForm history={props.history} action="signUp" nextAction="SignIn" />;

SignUp.propTypes = {
  history: PropTypes.object.isRequired,
};

export default SignUp;
