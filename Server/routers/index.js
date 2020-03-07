"use strict"
const router = require('express').Router();
const taskRouter = require('./taskRouter.js');
const userRouter = require('./userRouter.js');
const passwordWolfRouter = require("./passwordWolfRouter.js");
const Authentication = require("../middleware/Authentication.js");

router.use('/todos', Authentication, taskRouter);
router.use('/user', userRouter);
router.use('/passwordWolf', passwordWolfRouter);

module.exports = router;