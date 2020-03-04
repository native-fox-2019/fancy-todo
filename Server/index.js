"use strict"

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const morganChalk = require('./morganChalk');
const router = require('./routers');
const ErrorHandler = require('./middleware/ErrorHandler');
const dotenv = require('dotenv');
const path = require('path');
const cors = require("cors");
dotenv.config();

app.use(cors());
app.use('/static', express.static(path.join(__dirname, 'public')))
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

console.log("PORT", process.env.PORT);
console.log("DB_USER", process.env.DB_USER);
console.log("DB_PASS", process.env.DB_PASS);
console.log("JWT_SECRET", process.env.JWT_SECRET);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app