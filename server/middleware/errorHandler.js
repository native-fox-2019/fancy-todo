// SequelizeDatabaseError
// SequelizeValidationError === undefined

module.exports = (err, req, res, next) => {

  // console.log(err, '<<<<<<<< ')
  if (err.name === 'SequelizeValidationError') {
    let errors = []
    err.errors.forEach(el => {
      errors.push(el.message)
    });
    res.status(400).json(errors)
  } else if (err.name === 'NotFoundError') {
    res.status(400).json(err)
  } else if (err.name === 'SequelizeDatabaseError') {
    res.status(404).json('not found')
  } else if (err.name === 'UnauthorizedError') {
    res.status(401).json(err)
  }
  else {
    res.status(500).json('500 internal server error')
  }
}