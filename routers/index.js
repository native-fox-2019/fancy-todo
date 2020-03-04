"use strict"
const router = require('express').Router();
const taskRouter = require('./taskRouter.js');
const userRouter = require('./userRouter.js');
const Authentication = require("../middleware/Authentication.js");

router.use('/todos', Authentication, taskRouter);
router.use("/user", userRouter);

module.exports = router;