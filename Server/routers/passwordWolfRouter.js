"use strict"

const router = require('express').Router();
const PasswordWolfController = require('../controllers/PasswordWolfController');

router.get('/generate', PasswordWolfController.generate);

module.exports = router;