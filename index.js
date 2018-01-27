var express = require('express');
var http = require('http').Server(app);

/*
  Iniciar e Configurar o Express
*/
var app = express();
  app.use(express.static(__dirname + '/public'));
/*
  Iniciar o Servidor
*/
var server = http.createServer(app);
app.listen(3000);

/*
  Carregar o Socket.io e o Protocolo de IRC
*/
require('./lib/server.js')(server);
