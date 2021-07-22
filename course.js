/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const routes = require('./controllers/index');

const app = express();
app.use(express.static(path.join(__dirname, 'views/course')));
app.use(express.json());
app.use('/', routes);

app.listen(5000, () => {
  console.log('listening from port 5000');
});
