const resendImage = require('./resendImage')

test('Resend image attachment', () => {
  const imageURL =
    'https://cdn.discordapp.com/attachments/822059316806811651/842951388853829652/unknown.png'
  let sentMessage = ''
  const basicMessage = {
    channel: {
      send: (message) => (sentMessage += message),
    },
    content: imageURL,
    author: {
      id: '000',
    },
    createdAt: new Date(2021, 5, 14, 7, 22, 1, 1),
    embeds: [
      {
        type: 'image',
        url: imageURL,
      },
    ],
  }

  resendImage(basicMessage, 'Sebelum diunsent:')
  expect(sentMessage).toEqual(
    `Sebelum diunsent:${imageURL}By : <@${
      basicMessage.author.id
    }> at ${basicMessage.createdAt.toLocaleString('id-ID')} WIB`
  )

  sentMessage = ''

  resendImage(basicMessage)
  expect(sentMessage).toEqual(
    `${imageURL}By : <@${
      basicMessage.author.id
    }> at ${basicMessage.createdAt.toLocaleString('id-ID')} WIB`
  )
})
