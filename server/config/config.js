module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_TITLE,
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "iltexzasidizyy",
    "password": "3b38f53b6483aec2dc99f7d8208eab0fd4bbf2487f797d73faf08c2b1e39b13c",
    "database": "d7vp6bgtkdc9vq",
    "host": "ec2-18-213-176-229.compute-1.amazonaws.com",
    "dialect": "postgres"
  }
}