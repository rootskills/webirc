module.exports = function (server) {


/*
Funções do Lado do Servidor
*/

io.sockets.on('connection', function (client) {

  client.on('connect', function (data) {
      // initialize irc connection
      var opts = {
        port:         6667,
        channels:     data.options.channels.split(", "),
        password:     null,
        userName:     data.options.userName || data.options.nickname,
        realName:     'PTnet Chat Test v0.0.1',
        secure:       data.options.ssl ? { rejectUnauthorized: false } : null,
        selfSigned:   data.options.ssl ? true : null,
        certExpired:  data.options.ssl ? true : null
      });

	var ircClient = new irc.Client(data.options.server, data.options.nickname, opts);

  // Mensagens a mostrar ao Utilizador
  ircClient.addListener('message', function (from, to, message) {
    client.emit('message', from, to, message);
            });

  // ENTRAR EM CANAIS (JOIN EVENT)

  ircClient.addListener('mejoin', function (join)) {
    client.emit('mejoin', { channel: channel });
  });

  ircClient.addListener('userjoin', function (data)) {
    client.emit('userjoin', data);
  });

    // SAIR DE CANAIS (PART EVENT)

  ircClient.addListener('mepart', function (join)) {
      client.emit('mepart', { channel: channel });
    });

  ircClient.addListener('userpart', function (data)) {
      client.emit('userpart', data);
    });

    // MUDAR DE NICK (CHANGE NICK)

  ircClient.addListener('nick', function (nick)) {
        client.emit('nick', { nick: nick });
      });


  /*
  COMANDOS ENVIADOS PELO Utilizador
  */

  client.on('command', function (data) {
				var command = data.substr(1).split(' ');

				switch (command[0].toLowerCase()) {
					case 'msg':
						var message = command.splice(2,command.length-2).join(' ');
						command[0] = 'privmsg';
						command.push(message);
						ircClient.send.apply(ircClient, command);

            break;
					case 'quit':
						ircClient.disconnect(function () {
							client.emit('disconnected');
						});
						break;
					default:
						ircClient.send.apply(ircClient, command);
						break;
				}
      });

      client.on('disconnect', function (data) {
		    ircClient.disconnect();
      });

    });

});

});
