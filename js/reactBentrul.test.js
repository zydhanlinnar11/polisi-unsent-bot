const reactBentrul = require('./reactBentrul')

test('React bentrul', () => {
  const bentrulArray = [
    'bener',
    'beNar',
    'bnR',
    'betul',
    'bentrul',
    'BenEr',
    'bNr',
  ]
  bentrulArray.forEach((content) => {
    const expectedReaction = '🇧🇪🇳🇹🇷🇺🇱'
    let reaction = ''
    reactBentrul({
      content,
      react: (reactSymbol) => (reaction += reactSymbol),
    })
    expect(reaction).toEqual(expectedReaction)
  })
})
