const {exercise, exercise_type/* , musclegroup */} = require('../models')

module.exports = {
    async index(req, res){
        try{
            exercise.belongsTo(exercise_type, {foreignKey: 'fk_type'})
            const exercises = await exercise.findAll({
                include: exercise_type
            });
            let result = []
            exercises.forEach(l => result.push(l.toJSON()))
            res.status(200).send(result)
        } catch(e){
            res.status(500).send({error: "Internal Server Error"})
            console.log("error", e)
        }
    }
}