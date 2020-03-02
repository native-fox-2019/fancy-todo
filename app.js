const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.use(require('./routers/index'));


app.listen(port, console.log(`Listening on port ${port}`));

module.exports = app;
