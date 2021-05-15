function onMessageUpdate(oldMsg, newMsg, actions = []) {
  if (oldMsg.author.bot) return 'Ini bot'
  if (
    oldMsg.content.indexOf('http://') != -1 ||
    oldMsg.content.indexOf('https://') != -1
  )
    return 'Ini URL'
  if (oldMsg.embeds.length == 0 && newMsg.embeds.length > 0) return 'New embed'
  actions.forEach((action) => {
    action.function(...action.params)
  })
}

module.exports = onMessageUpdate
