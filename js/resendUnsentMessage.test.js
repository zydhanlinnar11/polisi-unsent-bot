const resendUnsentMessage = require('./resendUnsentMessage')

test('Unsent message yang sesuai format', () => {
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

  resendUnsentMessage(basicMessage)
  expect(sentMessage).toEqual(
    `\"Basic message\"-<@000> ${basicMessage.createdAt.toLocaleString(
      'id-ID'
    )} WIB`
  )
})
