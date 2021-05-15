const resendMessage = require('./resendMessage')

test("Don't resend if it's embedded image", () => {
  const imageURL =
    'https://cdn.discordapp.com/attachments/822059316806811651/842951388853829652/unknown.png'
  let sentMessage = ''
  const basicMessage = {
    channel: {
      send: (message) => (sentMessage = message),
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

  resendMessage(basicMessage, 'Sebelum diunsent: ')
  expect(sentMessage).toEqual('')

  resendMessage(basicMessage)
  expect(sentMessage).toEqual('')
})

test('Resend message yang sesuai format', () => {
  let sentMessage = ''
  const basicMessage = {
    channel: {
      send: (message) => (sentMessage = message),
    },
    content: 'Basic message',
    author: {
      id: '000',
    },
    createdAt: new Date(2021, 5, 14, 7, 22, 1, 1),
  }

  resendMessage(basicMessage, 'Sebelum diunsent: ')
  expect(sentMessage).toEqual(
    `Sebelum diunsent:\ " Basic message \"-<@000> ${basicMessage.createdAt.toLocaleString(
      'id-ID'
    )} WIB`
  )

  resendMessage(basicMessage)
  expect(sentMessage).toEqual(
    `\" Basic message \"-<@000> ${basicMessage.createdAt.toLocaleString(
      'id-ID'
    )} WIB`
  )
})
