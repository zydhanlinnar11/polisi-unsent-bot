require('dotenv').config()
const READY_MESSAGE = process.env.READY_MESSAGE

function printSiap() {
  console.log(READY_MESSAGE)
}

module.exports = { printSiap, READY_MESSAGE }
