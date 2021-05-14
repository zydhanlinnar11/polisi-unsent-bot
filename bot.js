require('dotenv').config()

const discord = require('discord.js')
const client = new discord.Client({ fetchAllMembers: true })
const express = require('express')
const server = express()

const { printSiap } = require('./js/printSiap')
client.on('ready', printSiap)

const onMessageDeleteHandler = require('./js/onMessageDelete')
client.on('messageDelete', (msg) => {
  onMessageDeleteHandler(msg, client)
})

const { onMessageUpdate } = require('./js/onMessageUpdate')
client.on('messageUpdate', onMessageUpdate)

server.use(express.urlencoded({ extended: false }))

const { onMessage } = require('./js/onMessage')
client.on('message', onMessage)

const BOT_TOKEN = process.env.BOT_TOKEN
client.login(BOT_TOKEN)

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

const NOT_FOUND_MESSAGE = process.env.NOT_FOUND_MESSAGE
server.get('/*', (req, res) => {
  res.render('not-found', {
    avatarURL: client.user.avatarURL(),
    message: NOT_FOUND_MESSAGE,
    username: client.user.username,
  })
})

module.exports = {
  BOT_TOKEN,
  NOT_FOUND_MESSAGE,
}
server.listen(process.env.PORT || 8000)
