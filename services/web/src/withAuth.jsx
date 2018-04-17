import React, { Component } from 'react';

import Loader from './components/Loader';
import AuthService from './services/Auth';

const withAuth = WrappedComponent =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        authService: new AuthService(),
        dataReceived: false,
      };
    }
    componentWillMount() {
      const { authService } = this.state;
      if (authService.getToken() !== null) {
        authService.authenticate().then(() => {
          this.setState({ dataReceived: true });
        });
      } else {
        this.setState({ dataReceived: true });
      }
    }
    render() {
      const { authService, dataReceived } = this.state;
      if (!dataReceived) return <Loader />;
      return <WrappedComponent isAuthenticated={authService.isAuthenticated} />;
    }
  };

export default withAuth;
