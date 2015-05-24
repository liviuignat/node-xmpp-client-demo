var xmpp = require('./app/xmpp');

var c1 = xmpp.client.Client({
  jid: 'liviu@localhost',
  password: 'testpwd',
  host: 'localhost',
  reconnect: true
});
c1.on('online', function(data) {
  console.log('Connected as ' + data.jid.user + '@' + data.jid.domain + '/' + data.jid.resource);
});
c1.on('error', function(err) {
  console.log('error', err);
});
c1.on('stanza', function(stanza) {
  console.log('c1 Incoming stanza: ', stanza.toString());
});

var c2 = xmpp.client.Client({
  jid: 'alex@localhost',
  password: 'testpwd',
  host: 'localhost',
  reconnect: true
});
c2.on('online', function(data) {
  console.log('Connected as ' + data.jid.user + '@' + data.jid.domain + '/' + data.jid.resource);
});
c2.on('error', function(err) {
  console.log('error', err);
});
c2.on('stanza', function(stanza) {
  console.log('c2 Incoming stanza: ', stanza.toString());
});

var c3 = xmpp.client.Client({
  jid: 'alina@localhost',
  password: 'testpwd',
  host: 'localhost',
  reconnect: true
});
c3.on('online', function(data) {
  console.log('Connected as ' + data.jid.user + '@' + data.jid.domain + '/' + data.jid.resource);

  var payload = {
    client: c3,
    name: '2231231-kdlsada',
    user: data.jid.user,
    domain: data.jid.domain
  };

  xmpp.room.createNewRoom(payload);
  xmpp.room.configureRoom(payload);

  setTimeout(function() {
    xmpp.room.joinRoom({
      client: c1,
      name: '2231231-kdlsada',
      user: 'liviu',
      domain: 'localhost'
    });

    setTimeout(function() {
      xmpp.message.sendRoomMessage({
        client: c1,
        roomName: '2231231-kdlsada',
        user: 'liviu',
        domain: 'localhost',
        message: 'HELOOO ALL'
      });
    }, 1000);

  }, 1000);
});
c3.on('error', function(err) {
  console.log('error', err);
});
c3.on('stanza', function(stanza) {
  console.log('c3 Incoming stanza: ', stanza.toString());
});
