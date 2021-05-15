function resendMessage(msg, prefix = '') {
  if (msg.embeds?.[0]?.type === 'image' && msg.embeds?.[0]?.url === msg.content)
    return // Return if this an embedded image
  msg.channel.send(
    `${prefix}\"${msg.content}\"-<@${
      msg.author.id
    }> ${msg.createdAt.toLocaleString('id-ID')} WIB`
  )
}

module.exports = resendMessage
