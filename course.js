const express = require('express');
const routes = require('./controllers/index.js');
const path = require('path');
const app = express();

app.use(express.json()); 
app.use('/',routes);


app.listen(3000,()=>console.log('listening from port 3000')); 