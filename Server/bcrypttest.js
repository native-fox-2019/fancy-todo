const Bcrypt = require("./helpers/bcrypt");

const password = "marsupilami";

const hashed = Bcrypt.hash(password);

console.log(hashed, Bcrypt.compare(password, hashed));