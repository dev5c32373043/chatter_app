import * as authApi from '../api/auth';

export default class AuthService {
  constructor() {
    this.isAuthenticated = false;
    this.user = null;
  }
  getToken() {
    const token = localStorage.getItem('jwt_token');
    return token;
  }
  setToken(token) {
    localStorage.setItem('jwt_token', token);
  }
  authenticate() {
    return new Promise((resolve) => {
      authApi
        .authenticate(this.getToken())
        .then((user) => {
          this.user = user;
          this.isAuthenticated = true;
          resolve();
        })
        .catch(() => resolve());
    });
  }
  signIn(data) {
    return new Promise((resolve, reject) => {
      authApi
        .signIn(data)
        .then((result) => {
          this.setToken(result.token);
          this.user = result.user;
          this.isAuthenticated = true;
          resolve();
        })
        .catch(error => reject(error));
    });
  }
  signUp(data) {
    return new Promise((resolve, reject) => {
      authApi
        .signUp(data)
        .then((result) => {
          this.setToken(result.token);
          this.user = result.user;
          this.isAuthenticated = true;
          resolve();
        })
        .catch(error => reject(error));
    });
  }
}
