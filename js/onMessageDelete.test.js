const onMessageDelete = require('./onMessageDelete')

const botID = 'IDBOT'
const client = {
  user: {
    id: botID,
  },
}

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
  expect(onMessageDelete(messageAuthorIsAnotherBot, client)).toEqual(
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
  expect(onMessageDelete(messageContentEmpty, client)).toEqual(
    'Message content is empty'
  )
  expect(messageSent).toEqual('papapap')
})

test("Execute action if doesn't meet conditions above", () => {
  const expectedRepliedMessage = 'message'
  let repliedMessage = ''
  const messageObject = {
    author: {
      id: botID + 'pppppp',
    },
    channel: {
      send: (message) => (repliedMessage = 'Salah reply'),
    },
    content: 'message',
  }
  dummyFunction = () => {
    repliedMessage = expectedRepliedMessage
  }

  onMessageDelete({ author: { bot: false } }, client, [
    { function: dummyFunction, params: [messageObject] },
  ])
  expect(repliedMessage).toEqual(expectedRepliedMessage)
})
