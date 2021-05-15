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

module.exports = reactBentrul
