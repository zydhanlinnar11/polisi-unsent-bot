require('dotenv').config()

function joinVoiceIfMessageMatchCommand(msg) {
  if (msg?.member?.voice?.channel == null) return 'Voice channel unavailable'
  if (msg.content.toLowerCase() === process.env.JOIN_VOICE_COMMAND) {
    msg.reply(process.env.JOIN_VOICE_REPLY)
    msg.member.voice.channel.join()
  }
}

function leaveVoiceIfMessageMatchCommand(msg) {
  if (msg?.member?.voice?.channel == null) return 'Voice channel unavailable'
  if (msg.content.toLowerCase() === process.env.LEAVE_VOICE_COMMAND) {
    msg.reply(process.env.LEAVE_VOICE_REPLY)
    msg.member.voice.channel.leave()
  }
}

function reactBentrul(msg) {
  const bentrulArray = ['bener', 'benar', 'bnr', 'betul', 'bentrul']
  for (let i = 0; i < bentrulArray.length; i++) {
    if (msg.content.toLowerCase().indexOf(bentrulArray[i]) != -1) {
      msg.react('🇧')
      msg.react('🇪')
      msg.react('🇳')
      msg.react('🇹')
      msg.react('🇷')
      msg.react('🇺')
      msg.react('🇱')
      break
    }
  }
}

function onMessage(
  msg,
  joinVoiceFunction = joinVoiceIfMessageMatchCommand,
  leaveVoiceFunction = leaveVoiceIfMessageMatchCommand,
  reactSomethingBasedOnMessage = reactBentrul
) {
  if (msg.author.bot) return 'Ini bot'
  joinVoiceFunction(msg)
  leaveVoiceFunction(msg)
  reactSomethingBasedOnMessage(msg)
  return 'Bukan bot'
}

module.exports = {
  joinVoiceIfMessageMatchCommand,
  leaveVoiceIfMessageMatchCommand,
  reactBentrul,
  onMessage,
}
