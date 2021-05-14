function onMessageUpdate(oldMsg, newMsg) {
  if (oldMsg.author.bot) return 'Ini bot'
  if (
    oldMsg.content.indexOf('http://') != -1 ||
    oldMsg.content.indexOf('https://') != -1
  )
    return 'Ini URL'
  if (oldMsg.embeds.length == 0 && newMsg.embeds.length > 0) return 'New embed'
  oldMsg.channel.send(
    `Sebelum diedit : \"${oldMsg.content}\"-<@${
      oldMsg.author.id
    }> ${oldMsg.createdAt.toLocaleString('id-ID')} WIB`
  )
  return 'Message before update sent'
}

module.exports = { onMessageUpdate }
