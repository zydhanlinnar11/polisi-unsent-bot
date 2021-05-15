require('dotenv').config()

const discord = require('discord.js')
const client = new discord.Client({ fetchAllMembers: true })
const express = require('express')
const server = express()

client.on('ready', () => {
  console.log(process.env.READY_MESSAGE)
})

client.on('messageDelete', (msg) => {
  const onMessageDelete = require('./js/onMessageDelete')
  const actions = [
    {
      function: require('./js/resendMessage'),
      params: [msg, 'Sebelum diunsent : '],
    },
    {
      function: require('./js/resendImage'),
      params: [msg, 'Sebelum diunsent : '],
    },
  ]
  onMessageDelete(msg, client, actions)
})

client.on('messageUpdate', (oldMsg, newMsg) => {
  const onMessageUpdate = require('./js/onMessageUpdate')
  const actions = [
    {
      function: require('./js/resendMessage'),
      params: [oldMsg, 'Sebelum diedit : '],
    },
  ]
  onMessageUpdate(oldMsg, newMsg, actions)
})

server.use(express.urlencoded({ extended: false }))

const onMessage = require('./js/onMessage')
client.on('message', (msg) => {
  actions = [
    // React bentrul
    {
      function: require('./js/reactBentrul'),
      params: [msg],
    },
  ]
  onMessage(msg, actions)
})

client.login(process.env.BOT_TOKEN)

server.get('/', (req, res) => {
  res.redirect('./server')
})

server.set('view engine', 'ejs')
server.set('views', __dirname + '/views')
server.use(express.static('public'))

const channelRouter = require('./routes/channel')
server.use('/channel', channelRouter(client))

const serverRouter = require('./routes/server')
server.use('/server', serverRouter(client))

server.get('/*', (req, res) => {
  res.render('not-found', {
    avatarURL: client.user.avatarURL(),
    message: process.env.NOT_FOUND_MESSAGE,
    username: client.user.username,
  })
})

server.listen(process.env.PORT || 8000)
