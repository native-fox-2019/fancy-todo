'use strict'
const bcrypt = require('bcrypt')

function comparePass(passwordInput, hashingPass) {
  const compare = bcrypt.compareSync(passwordInput, hashingPass)
  return compare
}

module.exports = comparePass