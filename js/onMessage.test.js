const onMessage = require('./onMessage')

test("Don't reply if sender is bot", () => {
  expect(onMessage({ author: { bot: true } })).toEqual('Ini bot')
})

test("Reply if sender isn't bot", () => {
  const expectedRepliedMessage = 'Bukan bot'
  let repliedMessage = ''
  dummyFunction = () => {
    repliedMessage = expectedRepliedMessage
  }

  onMessage({ author: { bot: false } }, [
    { function: dummyFunction, params: [] },
  ])
  expect(repliedMessage).toEqual(expectedRepliedMessage)
})
