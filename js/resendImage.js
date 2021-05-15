function resendImage(msg, prefix = '') {
  if (msg.embeds?.[0]?.type !== 'image') return

  msg.channel.send(prefix)

  if (msg.embeds?.[0]?.type === 'image') {
    msg.channel.send(msg.embeds[0].url)
  }

  msg.channel.send(
    `By : <@${msg.author.id}> at ${msg.createdAt.toLocaleString('id-ID')} WIB`
  )
}

module.exports = resendImage
