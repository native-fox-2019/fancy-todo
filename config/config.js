module.exports = {
  "development": {
    "username": process.env.DB_USERNAME || "postgres",
    "password": process.env.DB_PASSWORD || "postgres",
    "database": "Fancy-Todo",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}

// {
//   "development": {
//     "username": "postgres",
//     "password": "postgres",
//     "database": "Fancy-Todo",
//     "host": "127.0.0.1",
//     "dialect": "postgres"
//   },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql",
//     "operatorsAliases": false
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql",
//     "operatorsAliases": false
//   }
// }
