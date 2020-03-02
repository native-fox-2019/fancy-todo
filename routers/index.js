"use strict"

const router = require('express').Router();
const taskRouter = require('./taskRouter.js');

router.use('/todos', taskRouter);

module.exports = router;