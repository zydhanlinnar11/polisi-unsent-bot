require('dotenv').config()
const onMessage = require('./onMessage')

test('Not join voice if the message is falsy values', () => {
  expect(
    onMessage.joinVoiceIfMessageMatchCommand({
      msg: {
        member: {
          voice: {
            channel: undefined,
          },
        },
      },
    })
  ).toEqual('Voice channel unavailable')
  expect(onMessage.leaveVoiceIfMessageMatchCommand({})).toEqual(
    'Voice channel unavailable'
  )
})

test('Not leave voice if the message is falsy values', () => {
  expect(
    onMessage.leaveVoiceIfMessageMatchCommand({
      msg: {
        member: {
          voice: {
            channel: undefined,
          },
        },
      },
    })
  ).toEqual('Voice channel unavailable')
  expect(onMessage.leaveVoiceIfMessageMatchCommand({})).toEqual(
    'Voice channel unavailable'
  )
})

test('Join and send reply message when message match join command', () => {
  let reply = ''
  let joined = false
  onMessage.joinVoiceIfMessageMatchCommand({
    content: new String(process.env.JOIN_VOICE_COMMAND),
    reply: (msg) => (reply = msg),
    member: {
      voice: {
        channel: {
          join: () => (joined = true),
        },
      },
    },
  })
  expect(reply).toEqual(process.env.JOIN_VOICE_REPLY)
  expect(joined).toEqual(true)
})

test('Leave and send reply message when message match leave command', () => {
  let reply = ''
  let left = false
  onMessage.leaveVoiceIfMessageMatchCommand({
    content: new String(process.env.LEAVE_VOICE_COMMAND),
    reply: (msg) => (reply = msg),
    member: {
      voice: {
        channel: {
          leave: () => (left = true),
        },
      },
    },
  })
  expect(reply).toEqual(process.env.LEAVE_VOICE_REPLY)
  expect(left).toEqual(true)
})

test('React bentrul', () => {
  const bentrulArray = ['bener', 'benar', 'bnr', 'betul', 'bentrul']
  bentrulArray.forEach((content) => {
    const expectedReaction = '🇧🇪🇳🇹🇷🇺🇱'
    let reaction = ''
    onMessage.reactBentrul({
      content,
      react: (reactSymbol) => (reaction += reactSymbol),
    })
    expect(reaction).toEqual(expectedReaction)
  })
})

test("Don't reply if sender is bot", () => {
  function dummyFunction() {}
  expect(
    onMessage.onMessage(
      { author: { bot: true } },
      dummyFunction,
      dummyFunction,
      dummyFunction
    )
  ).toEqual('Ini bot')
})

test("Reply if sender isn't bot", () => {
  function dummyFunction() {}
  expect(
    onMessage.onMessage(
      { author: { bot: false } },
      dummyFunction,
      dummyFunction,
      dummyFunction
    )
  ).toEqual('Bukan bot')
})
