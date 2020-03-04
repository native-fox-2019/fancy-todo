const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {

  encrypt: function(password){
    return bcrypt.hash(password, saltRounds)
  },
  
  compare: function(password, hash){
    return bcrypt.compare(password, hash)
  }
}