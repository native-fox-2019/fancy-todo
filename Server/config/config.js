require('dotenv').config()
module.exports = {
  "development": {
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "dialect": "postgres"
  },
  "production": {
    "username": "waruohqmaipah",
    "password": "86e5ab894e3f289a918301ec2f69bd835d9109e8e818abbdae5f9fcf2d79b7aa",
    "database": "d1o8b1ggbvehke",
    "host": "ec2-184-72-235-159.compute-1.amazonaws.com",
    "dialect": "postgres"
  }
}