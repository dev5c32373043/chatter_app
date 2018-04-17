import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AuthService from '../../services/Auth';
import { authFormValidator } from '../../validators/forms';
import Toast from '../Toast';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      password: '',
      errors: {},
      authService: new AuthService(),
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.moveToChat = this.moveToChat.bind(this);
  }
  onChange(e) {
    const { name, value } = e.target;
    const errors = Object.assign({}, this.state.errors);
    errors[name] = undefined;
    this.setState({ [name]: value, errors });
  }
  onSubmit(event) {
    event.preventDefault();

    const { action } = this.props;
    const { authService, nickname, password } = this.state;
    authFormValidator({ nickname, password }).then((errors) => {
      if (Object.keys(errors).length) {
        this.setState({ errors });
      } else {
        authService[action]({ nickname, password })
          .then(this.moveToChat)
          .catch((e) => {
            this.setState({ errors: e }, this.hideNotification);
          });
      }
    });
  }
  hideNotification() {
    const { errors } = this.state;
    if (typeof errors.notification === 'string') {
      setTimeout(() => {
        const e = Object.assign({}, errors, { notification: undefined });
        this.setState({ errors: e });
      }, 5000);
    }
  }
  moveToChat() {
    this.props.history.push('/', { isAuthenticated: true });
  }
  isHasError(item) {
    const error = (item instanceof Object && item.message) || item;
    if (error) {
      const key = Object.keys(item)[0];
      return (
        <label htmlFor={key} className="error">
          {error}
        </label>
      );
    }
    return null;
  }
  render() {
    const { errors, nickname, password } = this.state;
    const { action, nextAction } = this.props;
    return (
      <form className="auth-form" onSubmit={this.onSubmit}>
        {errors.notification && <Toast content={errors.notification} />}
        <h2>{action}</h2>
        <div className="form-group">
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={nickname}
            onChange={this.onChange}
            placeholder="enter your nickname"
            className="form-control"
          />
          {this.isHasError(errors.nickname)}
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={this.onChange}
            placeholder="enter your password"
            className="form-control"
          />
          {this.isHasError(errors.password)}
        </div>
        <div className="btn-group">
          <button type="submit" className="btn btn-embossed btn-primary">
            Submit
          </button>
          <Link
            className="btn btn-embossed btn-primary"
            to={nextAction === 'SignUp' ? '/sign_up' : '/sign_in'}
          >
            {nextAction}
          </Link>
        </div>
      </form>
    );
  }
}

AuthForm.propTypes = {
  action: PropTypes.string.isRequired,
  nextAction: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};

export default AuthForm;
