const { User } = require(`../models`)
const token = require(`../helper/token`)
const { decodePassword } = require(`../helper/bcrypt`)

class LoginController {

    static doLogin (req, res, next) {
        let userData = null
        User.findOne({where:{email:req.body.email}})
        .then(data => {
            if (data != null) {
                let hashed = data.password
                let password = req.body.password
                userData = {
                    id:data.id,
                    email:data.email
                }
                return decodePassword(password, hashed)
            } else {
                next({
                    status:404,
                    msg:`Invalid username / password`
                })
            }
        })
        .then(result => {
            if (result) {
                let gotToken = token(userData)
                req.headers = gotToken
                console.log(req.headers)
                req.userData = userData
                res.status(200).json({token:gotToken}) //only token given back to user
            } else {
                next({
                    status:400,
                    msg:`invalid email / password`
                })
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = LoginController