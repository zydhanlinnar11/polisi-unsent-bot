const onMessageUpdate = require('./onMessageUpdate')

test('Return if sender is bot', () => {
  expect(
    onMessageUpdate({ author: { bot: true } }, { author: { bot: true } })
  ).toEqual('Ini bot')
})

test('Return if message containts URL', () => {
  expect(
    onMessageUpdate(
      { author: { bot: false }, content: new String('https://zydhan.xyz') },
      { author: { bot: false } }
    )
  ).toEqual('Ini URL')
  expect(
    onMessageUpdate(
      { author: { bot: false }, content: new String('https://') },
      { author: { bot: false } }
    )
  ).toEqual('Ini URL')
  expect(
    onMessageUpdate(
      { author: { bot: false }, content: new String('http://zydhan.xyz') },
      { author: { bot: false } }
    )
  ).toEqual('Ini URL')
  expect(
    onMessageUpdate(
      { author: { bot: false }, content: new String('http://') },
      { author: { bot: false } }
    )
  ).toEqual('Ini URL')
})

test('Return if current embeds is nothing and updated with some embeds', () => {
  expect(
    onMessageUpdate(
      { author: { bot: false }, embeds: [], content: new String('something') },
      { author: { bot: false }, embeds: ['ppp'] }
    )
  ).toEqual('New embed')
})

test('Execute actions if not met conditions above', () => {
  const expectedRepliedMessage = 'mantap'
  let repliedMessage = ''
  dummyFunction = () => {
    repliedMessage = expectedRepliedMessage
  }
  const date = new Date(2021, 5, 14, 7, 22, 1, 1)
  onMessageUpdate(
    {
      author: { bot: false, id: '000' },
      embeds: [],
      content: new String('something'),
      createdAt: date,
      channel: {
        send: (msg) => (repliedMessage = msg),
      },
    },
    { author: { bot: false }, embeds: [] },
    [{ function: dummyFunction, params: [expectedRepliedMessage] }]
  )
  expect(repliedMessage).toEqual(expectedRepliedMessage)
})
