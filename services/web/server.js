const express = require('express');
const path = require('path');
const helmet = require('helmet');

const app = express();

const PORT = process.env.PORT || 4001;

app.use(helmet());

app.get('/fonts*', (req, res) => {
  res.sendFile(`${process.cwd()}/node_modules/flat-ui/${req.url}`);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(PORT, () => console.log(`client listen on ${PORT} port!`));
