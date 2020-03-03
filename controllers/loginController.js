const { User } = require(`../models`)
const token = require(`../middleware/token`)

class LoginController {

    static doLogin (req, res, next) {
        let { email, password } = req.body
        User.findOne({where:{email, password}})
        .then(data => {
            if (data != null) {
                let userData = {
                    id:data.id,
                    email
                }
                let gotToken = token(userData)
                req.header = gotToken
                req.userData = userData
                res.status(200).json(req.header)
                
            } else {
                next({name:`username / password invalid`, status:400})
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = LoginController