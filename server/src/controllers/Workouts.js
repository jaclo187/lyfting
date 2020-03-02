const {workout, set, set_exercise_log/* , exercise, exercise_type, musclegroup */} = require('../models')
//const ERRORMESSAGE = "Login infromation is invalid"
//const JWTTIME = 60 * 60 * 24 * 7 //ONE WEEK
const config = require('../config/config')
const jwt = require('jsonwebtoken')

module.exports = {
    async index (req, res) {
        try {
            const decode = jwt.verify(req.body.token, config.jwt.secret);

            if(decode){ 
                let workouts = []
                const userWorkouts = await workout.findAll({
                    where: {
                        fk_user: decode.id
                    }
                })

                for(let i = userWorkouts.length - 1; i >= 0; i--){
                    let w = userWorkouts[i]
                    w.dataValues.sets = []
                    let workoutSets = await set.findAll({
                        where: {
                            fk_workout: w.dataValues.id
                        }
                    })

                    for(let j = workoutSets.length - 1; j >= 0; j--){
                        let s = workoutSets[j]
                        s.dataValues.data = []
                        let setLog = await set_exercise_log.findAll({
                            where: {
                                fk_set: s.dataValues.id
                            }
                        })

                        for(let k = setLog.length - 1; k >= 0; k--){
                            let l = setLog[i]
                            s.dataValues.data.push(l.toJSON())
                        }
                        w.dataValues.sets.push(s.toJSON())
                    }
                    workouts.push(w.toJSON())
                }
                res.status(200).send({workouts})
            }
        } 
        catch(err) {
            res.status(400).send({error: "Your session is no longer valid"})
        }
    }
}