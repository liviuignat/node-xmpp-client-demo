var Client = require('node-xmpp-client');
var ltx = Client.ltx;

/*
  client: {Client}
  user {String}
  roomName {String} - room name
  domain {String}
  message {String}
*/

var sendRoomMessage = function(options) {
  var roomJid = options.roomName + '@conference.' + options.domain;
  var presence = new ltx.Element('message', {
    to: roomJid,
    type: 'groupchat'
  }).
  c('body').t(options.message);

  options.client.send(presence.tree());
};

module.exports = {
  sendRoomMessage: sendRoomMessage
};
