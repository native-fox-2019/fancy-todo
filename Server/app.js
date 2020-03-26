"use strict"

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const morganChalk = require('./morganChalk');
const router = require('./routers');
const ErrorHandler = require('./middleware/ErrorHandler');
const dotenv = require('dotenv');
const cors = require("cors");
dotenv.config();

app.use(cors());

app.use(morganChalk);
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(router);
app.use(ErrorHandler);

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swaggerOptions");
const specs = swaggerJsdoc(swaggerOptions);
router.use("/docs", swaggerUi.serve);
router.get("/docs", swaggerUi.setup(specs, {
    explorer: true
}));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app