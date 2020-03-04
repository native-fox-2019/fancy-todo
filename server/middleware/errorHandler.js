// SequelizeDatabaseError
// SequelizeValidationError === undefined
// JsonWebTokenError:

module.exports = (err, req, res, next) => {
  console.log(err, '<<<<<<<< error console')
  if (err.name === 'SequelizeValidationError') {
    let errors = []
    err.errors.forEach(el => {
      errors.push(el.message)
    });
    res.status(400).json(errors)
  } else if (err.name === 'NotFoundError') {
    res.status(404).json(err)
  } else if (err.name === 'SequelizeDatabaseError') {
    res.status(404).json('not found')
  } else if (err.name === 'UnauthorizedError') {
    res.status(401).json(err)
  } else if (err.name === 'JsonWebTokenError') {
    res.status(404).json('data invalid')
  } else if (err.name === 'BadRequestError') {
    res.status(400).json('Email or password wrong')
  }
  else {
    res.status(500).json('500 internal server error')
  }
}