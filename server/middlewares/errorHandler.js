module.exports = (err, req, res, next) => {
	if (err.status == 404) {
		res.status(404).json(err)
	}else if (err.status == 400) {
		res.status(400).json(err)
	}else if (err.status == 401) {
		res.status(401).json(err)
	}else if (err.status == 403) {
		res.status(403).json(err)
	}else if(err.name === 'SequelizeValidationError'){
		let errors = []
		err.errors.forEach(element => {
			errors.push(element.message)
		});
		res.status(400).json(errors)
	}else {
		res.status(500).json('Error Server!')
	}
}