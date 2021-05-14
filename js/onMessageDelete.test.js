const onMessageDelete = require('./onMessageDelete')

const botID = 'IDBOT'
const client = {
  user: {
    id: botID,
  },
}

test('Resend message if the author of that message is this bot', () => {
  const message = 'This message was sent by this bot'
  let messageSent = ''
  const messageAuthorIsThisBot = {
    author: {
      id: botID,
    },
    channel: {
      send: (message) => (messageSent = message),
    },
    content: message,
  }
  onMessageDelete(messageAuthorIsThisBot, client, () => '')
  expect(messageSent).toEqual(message)
})

test("If the author of that message is another bot, don't do anything", () => {
  let messageSent = ''
  const messageAuthorIsAnotherBot = {
    author: {
      id: botID + 'p',
      bot: true,
    },
    channel: {
      send: (message) => (messageSent = message),
    },
  }
  expect(onMessageDelete(messageAuthorIsAnotherBot, client, () => '')).toEqual(
    'This is another bot'
  )
  expect(messageSent).toEqual('')
})

test("If the message is empty, don't do anything", () => {
  let messageSent = 'papapap'
  const messageContentEmpty = {
    author: {
      id: botID + 'p',
      bot: false,
    },
    channel: {
      send: (message) => (messageSent = message),
    },
    content: '',
  }
  expect(onMessageDelete(messageContentEmpty, client, () => '')).toEqual(
    'Message content is empty'
  )
  expect(messageSent).toEqual('papapap')
})

test("If the message isn't empty and the author isn't bot, resend message", () => {
  const resendUnsentMessage = require('./resendUnsentMessage')
  let messageSent = ''
  const messageContentEmpty = {
    author: {
      id: '000',
      bot: false,
    },
    channel: {
      send: (message) => (messageSent = message),
    },
    content: 'papapap',
    createdAt: new Date(2021, 5, 14, 7, 22, 1, 1),
  }
  expect(
    onMessageDelete(messageContentEmpty, client, resendUnsentMessage)
  ).toEqual('Message sent')
  expect(messageSent).toEqual(
    `\"papapap\"-<@000> ${messageContentEmpty.createdAt.toLocaleString(
      'id-ID'
    )} WIB`
  )
})
