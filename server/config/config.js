const dotenv = require('dotenv')
if(process.env.NODE_ENV !== 'production'){
  dotenv.config()
}

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
    "username": "zmzxtwrpkgsgbw",
    "password": "45a522bc90985537ad992c4015c1205821868f91cb34579496626d3b5e53822c",
    "database": "d64642qu468pqb",
    "host": "ec2-34-192-30-15.compute-1.amazonaws.com",
    "dialect": "postgres"
  }
}