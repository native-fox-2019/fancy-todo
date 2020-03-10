// const dotenv = require('dotenv')
// if(process.env.NODE_ENV !== 'production'){
//   dotenv.config()
// }

require('dotenv').config()

module.exports = {
  "development": {
    "username": process.env.CONFIG_USER,
    "password": process.env.CONFIG_PASS,
    "database": "Todo_list3",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "oftvsfutlsbgsj",
    "password": "be108aefd41e2aec015a1aa3d0fcbe891d4da1931595b4b4fc60d68546868c15c",
    "database": "dc5941reeevuri",
    "host": "ec2-52-23-14-156.compute-1.amazonaws.com",
    "dialect": "postgres"
  }
}