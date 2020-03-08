const dotenv = require('dotenv')
if(process.env.NODE_ENV !== 'production'){
  dotenv.config()
}

module.exports = {
  "development": {
    "username": "gusti",
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
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}