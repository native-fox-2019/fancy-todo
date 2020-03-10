// require('dotenv').config()
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": "fancy-todo",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": "eptiondixeuhgt",
    "password": "d376fbe0759fccdef4c894214a85c732c33b3697865f6ba98573913ff1660083",
    "database": "d1a0opqepvbtvg",
    "host": "ec2-34-200-116-132.compute-1.amazonaws.com",
    "dialect": "postgres"
  }
}
