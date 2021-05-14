const Discord = require('discord.js')
const e = require('express')

module.exports = (client = Discord.Client) => {
  const express = require('express')
  const router = express.Router()

  router.get('/', (req, res) => {
    servers_id = []
    servers_obj = []
    client.guilds.cache.forEach((guild) => {
      servers_id.push(guild.id)
    })

    servers_id.forEach((server_id) => {
      const server = client.guilds.cache.get(server_id)
      servers_obj.push({
        name: server.name,
        id: server_id,
        icon: server.iconURL(),
      })
    })
    res.render('list-server', { servers: servers_obj })
  })

  router.get('/:server_id/send-message', (req, res) => {
    const server = client.guilds.cache.get(req.params.server_id)
    const channel = client.channels.cache.get(req.query.channel_id)
    const members = server.members.cache
    const memberList = []
    members.forEach((member) => {
      if (!member.user.bot)
        memberList.push({
          nick:
            member.nickname != null ? member.nickname : member.user.username,
          id: member.id,
          avatarURL: member.user.avatarURL(),
        })
    })
    memberList.sort((a, b) => (a.nick < b.nick ? -1 : 1))
    const serverName = client.guilds.cache.get(req.params.server_id).name
    res.render('send-message', {
      name: channel.name,
      id: channel.id,
      msg: req.query.msg,
      server_id: req.params.server_id,
      server_name: serverName,
      members: memberList,
    })
  })

  router.get('/:server_id', (req, res) => {
    const server = client.guilds.cache.get(req.params.server_id)
    if (server == undefined) res.redirect('/not-found')
    const channels = server.channels
    const channel_obj = []
    channels.cache.forEach((element) => {
      if (element.type === 'text') {
        channel_obj.push({ name: element.name, id: element.id })
      }
    })

    channel_obj.sort((a, b) =>
      a.name < b.name ? -1 : a.name == b.name ? 0 : 1
    )

    res.render('list-channel', {
      channels: channel_obj,
      server_id: req.params.server_id,
      server_name: server.name,
    })
  })

  return router
}
