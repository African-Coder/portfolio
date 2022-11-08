const express = require('express');

var app = express();

const port = 3001;

app.get('/', (req, res) => res.send('Welcome to our API'));

app.listen(process.env.PORT || 5000);