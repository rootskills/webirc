var app = require('express')();
var http = require('http').Server(app);

/*
  Iniciar e Configurar o Express
*/

app.configure(function () {
  app.use(express.static(__dirname + '/public'));
  app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
});

/*
  Iniciar o Servidor
*/
var server = http.createServer(app).listen(process.env.PORT || 3000);

/*
  Carregar o Socket.io e o Protocolo de IRC
*/
require('./lib/server.js')(server);
