const router = require('express').Router()

router.use('/todos', require('./todoRouter'))
router.use('/users', require('./userRouter'))

module.exports = router