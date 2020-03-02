// SequelizeDatabaseError
// SequelizeValidationError === undefined

module.exports = (err, req, res, next) => {
  if (err.name === 'SequelizeValidationError') {
    res.status(400).json({ message: err.errors[0].message })
  } else if (err.message === 'NotFound') {
    res.status(404).json(err)
  } else {
    res.status(500).json('500 internal server error')
  }
}