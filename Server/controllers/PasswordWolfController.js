const axios = require("axios");

class PasswordWolfController {
    static generate(req, res, next) {
        axios.get("https://passwordwolf.com/api/?special=off&length=6&repeat=5")
            .then(response => {
                res.status(200).json(response.data);
            })
            .catch(err => next(err));
    }
}

module.exports = PasswordWolfController;