const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
});

app.get('/about', function(req, res) {
  res.sendFile(path.join(__dirname, 'about.html'))
});

app.get('/contact-me', function(req, res) {
  res.sendFile(path.join(__dirname, 'contact-me.html'))
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '404.html'))
});

app.listen(port);