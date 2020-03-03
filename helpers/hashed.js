const bcrypt = require("bcrypt");
const saltRounds = 10;
module.exports = {
  hashed(password) {
    return bcrypt.hash(password, saltRounds);
  },
  compare(password, hashed) {
    return bcrypt.compareSync(password, hashed);
  }
};
