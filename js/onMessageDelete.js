function onMessageDelete(
  msg,
  client,
  resendUnsentMessageFunction = require('./resendUnsentMessage')
) {
  if (msg.author.id === client.user.id) msg.channel.send(msg.content)
  if (msg.author.bot) return 'This is another bot'
  if (msg.content === '') return 'Message content is empty'
  resendUnsentMessageFunction(msg)
  return 'Message sent'
}

module.exports = onMessageDelete
