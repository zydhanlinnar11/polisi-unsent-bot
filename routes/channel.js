const Discord = require('discord.js')

module.exports = (client = Discord.Client) => {
  const express = require('express')
  const router = express.Router()

  router.get('/', (req, res) => {
    res.redirect('/')
  })

  router.post('/:channel_id/send-message', async (req, res) => {
    try {
      await client.channels.cache.get(req.body.channel_id).send(req.body.msg)
      res.status(200).send('Successfully send message.')
    } catch (error) {
      res.status(error.httpStatus).send(error.message)
    }
  })

  return router
}
