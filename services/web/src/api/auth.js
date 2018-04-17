export function authenticate(token) {
  return new Promise((resolve, reject) => {
    fetch('/auth/authenticate', {
      method: 'GET',
      headers: {
        Authorization: `jwt ${token}`,
      },
    }).then((resp) => {
      if (resp.status === 200) {
        resp.json().then(user => resolve(user));
      } else {
        reject(new Error('Not authenticated'));
      }
    });
  });
}

export function signIn(data) {
  return new Promise((resolve, reject) => {
    fetch('/auth/sign_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((resp) => {
      resp
        .json()
        .then(respData => (resp.status === 200 ? resolve(respData) : reject(respData.errors)));
    });
  });
}

export async function signUp(data) {
  return new Promise((resolve, reject) => {
    fetch('/auth/sign_up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((resp) => {
      resp
        .json()
        .then(respData => (resp.status === 201 ? resolve(respData) : reject(respData.errors)));
    });
  });
}
