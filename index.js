const express = require('express');
const http = require('http');
const irc = require('node-irc');
const app = express();
const server = http.createServer(app).listen(3000);

/*
  Iniciar e Configurar o Express
*/
  app.use(express.static(__dirname + '/public'));

/*
  Carregar o Socket.io e o Protocolo de IRC
*/
require('./lib/server.js');
