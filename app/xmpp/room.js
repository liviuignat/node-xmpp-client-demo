var Client = require('node-xmpp-client');
var ltx = Client.ltx;

/*
  client: {Client}
  user {String}
  name {String} - room name
  domain {String}
*/

var createNewRoom = function(options) {
  var userJid = options.user + '@' + options.domain;
  var roomJid = options.name + '@conference.' + options.domain;

  var pres = new ltx.Element(
      'presence', {
        from: userJid,
        to: roomJid + '/' + options.user
      })
    .c('x', {
      'xmlns': 'http://jabber.org/protocol/muc'
    });

  options.client.send(pres.tree())
};

/*
  client: {Client}
  user {String}
  name {String} - room name
  domain {String}
*/
var configureRoom = function(options) {
  var userJid = options.user + '@' + options.domain;
  var roomJid = options.name + '@conference.' + options.domain;

  var iq = new ltx.Element(
      'iq', {
        to: roomJid,
        type: 'set'
      })
    .c('query', {
      xmlns: 'http://jabber.org/protocol/muc#owner'
    })
    .c('x', {
      xmlns: "jabber:x:data",
      type: "submit"
    })
    //set room to be hidden by sending configuration. ref: http://xmpp.org/extensions/xep-0045.html
  iq.c('field', {
    'var': 'FORM_TYPE'
  })
    .c('value').t('http://jabber.org/protocol/muc#roomconfig').up().up()
    .c('field', {
      'var': 'muc#roomconfig_publicroom'
    })
    .c('value').t('0').up().up();

  options.client.send(iq.tree());
};

/*
  client: {Client}
  user {String}
  name {String} - room name
  domain {String}
*/
var joinRoom = function(options) {
  var roomJid = options.name + '@conference.' + options.domain;
  var presence = new ltx.Element('presence', {
    to: roomJid + '/' + options.user
  }).
  c('x', {
    xmlns: 'http://jabber.org/protocol/muc'
  });

  options.client.send(presence.tree());
};

module.exports = {
  createNewRoom: createNewRoom,
  configureRoom: configureRoom,
  joinRoom: joinRoom
};
