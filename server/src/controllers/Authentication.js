const {user} = require('../models')
const ERRORMESSAGE = "Login infromation is invalid"
const JWTTIME = 60 * 60 * 24 * 7 //ONE WEEK
const config = require('../config/config')
const jwt = require('jsonwebtoken')

const jwtSign = user => {
    return jwt.sign(user, config.jwt.secret, {
        expiresIn: JWTTIME
    })
}

module.exports = {
    async register (req, res) {
        try{
            const createdUser = await user.create(req.body)
            const jsonUser = createdUser.toJSON();
            delete jsonUser.password //Deleting user password form json response
            res.send({
                user: jsonUser,
                token: jwtSign(jsonUser)
            })
        } catch (e){
            res.status(400).send({
                error: "Username / Email must be unique"
            })
        }
    },
    async login (req, res) {
        try{
            const {email, password} = req.body
            const loginUser = await user.findOne({
                where: {
                    email: email
                }
            })
            
            if(!loginUser){
                return res.status(403).send({error: ERRORMESSAGE})
            }

            const isPasswordCorrect = await loginUser.comparePasswords(password)
            if(!isPasswordCorrect){
                return res.status(403).send({error: ERRORMESSAGE})
            }

            const jsonUser = loginUser.toJSON()
            delete jsonUser.password //Deleting user password form json response

            res.send({
                user: jsonUser,
                token: jwtSign(jsonUser)
            })

        } catch (e){
            res.status(500).send({
                error: ERRORMESSAGE
            })
        }
    }
}