require('dotenv').config()

function onMessage(msg, actions = []) {
  if (msg.author.bot) return 'Ini bot'
  actions.forEach((action) => {
    action.function(...action.params)
  })
}

module.exports = onMessage
