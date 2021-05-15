function resendMessage(msg, prefix = '') {
  const embedTypes = ['image', 'rich', 'video', 'gifv', 'article', 'link']
  if (
    embedTypes.indexOf(msg.embeds?.[0]?.type) != -1 &&
    msg.embeds?.[0]?.url === msg.content
  )
    return // Return if this an embedded message
  console.log(msg)
  msg.channel.send(
    `${prefix}\"${msg.content}\"-<@${
      msg.author.id
    }> ${msg.createdAt.toLocaleString('id-ID')} WIB`
  )
}

module.exports = resendMessage
