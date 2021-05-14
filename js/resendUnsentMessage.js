function resendUnsentMessage(msg) {
  msg.channel.send(
    `\"${msg.content}\"-<@${msg.author.id}> ${msg.createdAt.toLocaleString(
      'id-ID'
    )} WIB`
  )
}

module.exports = resendUnsentMessage
