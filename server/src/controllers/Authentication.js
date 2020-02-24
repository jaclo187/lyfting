const {user} = require('../models')

module.exports = {
    async register (req, res) {
        //console.log(User)
            //console.log(user)
        try{
            const createdUser = await user.create(req.body)
            
            res.send(createdUser.toJSON())
        } catch (e){
            res.status(400).send({
                error: e
            })
        }
    }
}