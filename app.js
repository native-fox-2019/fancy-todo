require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routers = require('./routers');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routers);
app.use(errorHandler);


app.listen(port, console.log(`Listening on port ${port}`));

module.exports = app;
