function onMessageDelete(msg, client, actions = []) {
  if (msg.author.id === client.user.id) {
    msg.channel.send(msg.content)
    return msg.content
  }
  if (msg.author.bot) return 'This is another bot'
  if (msg.content === '') return 'Message content is empty'
  actions.forEach((action) => {
    action.function(...action.params)
  })
}

module.exports = onMessageDelete
