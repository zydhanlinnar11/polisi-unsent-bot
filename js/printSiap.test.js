require('dotenv').config()

const { READY_MESSAGE } = require('./printSiap')

test('Message is string', () => {
  expect(typeof READY_MESSAGE).toEqual('string')
})

test('Message is equal to READY_MESSAGE', () => {
  expect(READY_MESSAGE).toEqual(process.env.READY_MESSAGE)
})
