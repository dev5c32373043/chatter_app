export function authFormValidator(data) {
  const errors = {};
  return new Promise((resolve) => {
    const nickname = data.nickname.trim();
    if (!nickname) {
      errors.nickname = 'nickname required!';
    } else if (nickname.length < 3) {
      errors.nickname = 'min length 3 symbols';
    }

    const password = data.password.trim();
    if (!password) {
      errors.password = 'password required!';
    } else if (password.length < 6) {
      errors.password = 'min length 6 symbols';
    }
    resolve(errors);
  });
}

export function messageFormValidator(message) {
  let error = '';
  const mess = message.trim();
  return new Promise((resolve) => {
    if (!mess) {
      error = 'Message required!';
    }
    resolve(error);
  });
}
