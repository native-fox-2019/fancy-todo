module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_TITLE,
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "klqpfmfsetrvzb",
    "password": "1de4644127a8a9e084f6d64dc8a54c806a100681625f9b2d53f2c2f6f8fd6af1",
    "database": "dag3hkurnq2fhf",
    "host": "ec2-52-45-14-227.compute-1.amazonaws.com",
    "dialect": "postgres"
  }
}