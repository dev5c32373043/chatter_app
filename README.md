# Chatter app

### Simple chat app with microservices architecture :neckbeard:

## Getting Started

```
sh postinstall.sh && pm2 start process.yml
```

### Minimal sample nginx configuration

```
upstream chatter_app_web {
  server 127.0.0.1:4001;
}
upstream chatter_app_chat {
  server 127.0.0.1:4002;
}
upstream chatter_app_auth {
  server 127.0.0.1:4003;
}

server {
  listen 80;
  server_name localhost;

  access_log /var/log/nginx/chatter-app.log;
  error_log  /var/log/nginx/chatter-app-error.log error;

  root #{PATH}/chatter_app/services/web/public;

  location / {
    proxy_pass http://chatter_app_web;
  }

  location /socket.io {
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_http_version 1.1;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $host;
    proxy_pass http://chatter_app_chat;
  }

  location /auth {
    proxy_pass http://chatter_app_auth;
  }
}
```

---

## Auth service API

### Check auth

* URL: /auth/authenticate

* Method: `GET`

* Headers: `jwt="token"`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{nickname: 'sampleuser'}`

* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `Not authorized`

### SignIn

* URL: /auth/sign_in

* Method: `POST`

* **Data Params**

  * **Required:**
    * nickname: string
    * password: string

* **Success Response:**
  * **Code:** 200 <br />
    **Content:** `{token: 'sampletoken', user: {nickname: 'sampleuser'}}`
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `{ errors: { notification: 'wrong nickname or password' } }`

### SignUp

* URL: /auth/sign_up

* Method: `POST`

* **Data Params**

  * **Required:**
    * nickname: string
    * password: string

* **Success Response:**
  * **Code:** 201 <br />
    **Content:** `{token: 'sampletoken', user: {nickname: 'sampleuser'}}`
* **Error Response:**
  * **Code:** 403 <br />
    **Content:** `{ errors: { nickname: 'sample error', password: 'sample error' } }`

---

## Chat socket API

## Get all chat messages

```
socket.on('messagesReceived', (messages)=> {});
socket.emit('getMessages'); // emit messagesReceived action with array of messages
```

## Create new message

```
socket.on('messageReceived', (message)=> {})

const message = 'hello world';
socket.emit('newMessage', message); // emit messageReceived action with message to all listen sockets
```

## Requirements

| Tools   |    Version    |
| ------- | :-----------: |
| Node.js |  8 and above  |
| MongoDB | 3.4 and above |
| Yarn    |     1.5.1     |
| PM2     |    2.10.1     |
| Nginx   |    1.10.3     |
