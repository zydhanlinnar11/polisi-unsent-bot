function resendEmbeddedMessage(msg, { prefix = '', embeddedTypes = [] }) {
  if (
    embeddedTypes.indexOf(msg.embeds?.[0]?.type) === -1 ||
    msg.embeds?.[0]?.url !== msg.content
  )
    return

  msg.channel.send(prefix)

  if (embeddedTypes.indexOf(msg.embeds?.[0]?.type) !== -1) {
    msg.channel.send(msg.embeds[0].url)
  }

  msg.channel.send(
    `By : <@${msg.author.id}> at ${msg.createdAt.toLocaleString('id-ID')} WIB`
  )
}

module.exports = resendEmbeddedMessage
