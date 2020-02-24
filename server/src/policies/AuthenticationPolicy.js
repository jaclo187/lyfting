const joi = require('joi')

module.exports = {
    register (req, res, next) {
        const schema = {
            username: joi.string(),
            email: joi.string().email(),
            password: joi.string()
        }

        const {error} = joi.validate(req.body, schema)

        if(error){
            console.log(error)
            switch (error.details[0].context.key) {
                case 'email':
                    res.status('400').send({
                        error: "Email not valid"
                    })
                    break;
                case 'password':
                    res.status('400').send({
                        error: "Password not valid"
                    })
                    break;
                case 'username':
                    res.status('400').send({
                        error: "Username not valid"
                    })
                    break;
                default:
                    res.status('400').send({
                        error: "Something went wrong"
                    })
                    break;
            }
        }
        else{
            next()
        }


    }
} 