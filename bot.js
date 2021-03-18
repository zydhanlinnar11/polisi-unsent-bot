require('dotenv').config()

const discord = require('discord.js')
const client = new discord.Client()

client.on('ready', () => {
  console.log('Halo2, siap 86!!!')
})

client.on('messageDelete', (msg) => {
  msg.channel.send(
    `\"${msg.content}\"-<@${msg.author.id}> ${msg.createdAt.toLocaleString(
      'id-ID'
    )} WIB`
  )
})

client.on('message', (msg) => {
  if (msg.content === 'halur bot') msg.reply('Haloo :v')
})

client.login(process.env.BOT_TOKEN)
