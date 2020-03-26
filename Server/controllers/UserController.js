const model = require('../models');
const User = model.User;
const Bcrypt = require('../helpers/bcrypt.js');
const jwt = require("../helpers/jwt.js");
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

/**
 * @swagger
 * tags:
 *  name: ToDo
 *  description: ToDo management
 */
/**
 * @swagger
 *  components:
 *    schemas:
 *      AccessToken:
 *        type: object
 *        required:
 *          - jwt
 *        properties:
 *          jwt:
 *            type: string
 *            description: JWT token
 *        example:
 *          jwt: eyHJSDjkhjkHKASHKJAHSKJsahjSJKHAKJh
 */
class UserController{
            /**
     * @swagger
     * path:
     *  /users/register:
     *    post:
     *      summary: Register new account
     *      tags: [User]
     *      requestBody:
     *        required: true
     *        content:
     *          application/x-www-form-urlencoded:
     *            schema:
     *              type: object
     *              properties:
     *                email:
     *                  type: string
     *                password:
     *                  type: string
     *              required:
     *                - name
     *                - email
     *      responses:
     *        "200":
     *          description: Object containing jwt
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/AccessToken'
     *        "500":
     *          description: Internal Server Error
     *    
     */
    static register(req, res, next){
        const email = req.body.email;
        const password = req.body.password;
        User.create({
            email: email,
            password: password
        })
            .then(data => {
                let token = jwt.sign({email: data.email});
                res.status(200).json({token})
            })
            .catch(next);
    }
            /**
     * @swagger
     * path:
     *  /users/login:
     *    post:
     *      summary: Login using email/password
     *      tags: [User]
     *      requestBody:
     *        required: true
     *        content:
     *          application/x-www-form-urlencoded:
     *            schema:
     *              type: object
     *              properties:
     *                email:
     *                  type: string
     *                password:
     *                  type: string
     *              required:
     *                - name
     *                - email
     *      responses:
     *        "200":
     *          description: Object containing jwt
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/AccessToken'
     *        "500":
     *          description: Internal Server Error
     *    
     */
    static login(req, res, next){
        const email = req.body.email;
        const password = req.body.password;
        User.findOne({ where: {email}})
        .then(data=>{
            if(data){
                if(Bcrypt.compare(password, data.password)){
                    let token = jwt.sign({email: data.email});
                    res.status(200).json({token})
                }else{
                    next({
                        status: 400,
                        message: "Wrong Password/Username"
                    });
                }
            }
            else{
                next(err);
            }
        })
    }
    static googleLogin(req, res, next) {
        let token = req.body.token;
        client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        })
        .then(response => {
            return User.findOne({ where: { email: response.payload.email } })
                .then(user => {
                    if (!user) {
                        return User.create({
                            email: response.payload.email,
                            password: '12345'
                        });
                    } else {
                        return user;
                    }
                });
        }).then(user => {
            let token = jwt.sign({email: user.email});
            res.status(200).json({ token });
        }).catch(err => {
            next(err);
        });
    }
}

module.exports = UserController;