const {workout/*,  set, set_exercise_log ,  exercise, exercise_type,  musclegroup */ } = require('../models')
//const ERRORMESSAGE = "Login infromation is invalid"
//const JWTTIME = 60 * 60 * 24 * 7 //ONE WEEK
const config = require('../config/config')
const jwt = require('jsonwebtoken')
const mysql = require('mysql2/promise');
let conn = undefined

const connect = async () => {
    if (!conn) conn = await mysql.createConnection(config.db);
};

module.exports = {
    async index (req, res) {
        try {
            const decode = jwt.verify(req.body.token, config.jwt.secret);

            if(decode && decode !== ""){
                if(!conn) await connect()
                let query,
                params
                
                if(req.body.id) {
                    query = `SELECT workout.id AS id, workout.date AS date, workout.\`name\` AS \`name\`, \`set\`.id AS set_id, set_exercise_log.weight AS weight, set_exercise_log.reps AS reps, set_exercise_log.time AS time, exercise.\`name\` AS exercise, musclegroup.name AS musclegroup, exercise_type.name AS type
                    FROM workout
                    LEFT JOIN \`set\` ON \`set\`.fk_workout = workout.id
                    LEFT JOIN set_exercise_log ON \`set\`.id = set_exercise_log.fk_set
                    LEFT JOIN exercise ON set_exercise_log.fk_exercise = exercise.id
                    LEFT JOIN exercise_type ON exercise.fk_type = exercise_type.id
                    LEFT JOIN musclegroup ON exercise.fk_musclegroup = musclegroup.id
                    WHERE workout.fk_user = ? AND workout.id = ?;`
                    params = [decode.id, req.body.id]
                } else {
                    query = `SELECT workout.id AS id, workout.date AS date, workout.\`name\` AS \`name\`, \`set\`.id AS set_id, set_exercise_log.weight AS weight, set_exercise_log.reps AS reps, set_exercise_log.time AS time, exercise.\`name\` AS exercise, musclegroup.name AS musclegroup, exercise_type.name AS type
                    FROM workout
                    LEFT JOIN \`set\` ON \`set\`.fk_workout = workout.id
                    LEFT JOIN set_exercise_log ON \`set\`.id = set_exercise_log.fk_set
                    LEFT JOIN exercise ON set_exercise_log.fk_exercise = exercise.id
                    LEFT JOIN exercise_type ON exercise.fk_type = exercise_type.id
                    LEFT JOIN musclegroup ON exercise.fk_musclegroup = musclegroup.id
                    WHERE workout.fk_user = ?;`
                    params = [decode.id]
                }

                let rows = await conn.execute(query, params)
                let result = rows[0],
                returnObj = {}

                for (let i = 0; i < result.length; i++) {
                    const row = result[i];
                    if( !Object.prototype.hasOwnProperty.call(returnObj, row.id) ){
                        returnObj[row.id] = {}
                        returnObj[row.id].sets = []
                        
                    }
                    if( !returnObj[row.id].sets[row.set_id] && row.set_id !== null ){
                        returnObj[row.id].sets[row.set_id] = {}
                        returnObj[row.id].sets[row.set_id].exercise = row.exercise
                        returnObj[row.id].sets[row.set_id].musclegroup = row.musclegroup
                        returnObj[row.id].sets[row.set_id].data = {}
                    }
                    returnObj[row.id].sets[row.set_id].data.weight = row.weight
                    returnObj[row.id].sets[row.set_id].data.time = row.time
                    returnObj[row.id].sets[row.set_id].data.reps = row.reps
                }
                res.status(200).send(JSON.stringify(returnObj))
            }
        } 
        catch(err) {
            console.log(err)
            res.status(400).send({error: "Your session is no longer valid"})
        }
    },

    async post(req, res) {
        try {
            const decode = jwt.verify(req.body.token, config.jwt.secret);
            
            if(decode && decode !== ""){
                const newWorkout = await workout.create({fk_user: decode.id})
                res.send(newWorkout.toJSON())
            }
        } catch (error) {
            res.status(400).send({error: "Your session is no longer valid"})
            console.log(error, "ERROR")
        }
    },

    async update(req, res) {
        try {
            const decode = jwt.verify(req.body.token, config.jwt.secret);
            
            if(decode && decode !== ""){
                workout.update(
                    {name: req.body.name},
                    {where: {
                        id: req.body.id
                    }}
                )
                res.status(200).send()
            }
        } catch (error) {
            res.status(400).send({error: "Your session is no longer valid"})
            console.log(error, "ERROR")
        }
    },

    async delete(req, res) {
        try {
            const decode = jwt.decode(req.headers.authorization, config.jwt.secret)
            if(decode && req.params.id){
                await workout.destroy({where: {id: req.params.id}})
            } else {
                res.status(402).send({error: "Could not delete workout, please try again"})
                console.log(req.body)
                console.log(req.headers)
            }
        } catch (error) {
            res.status(402).send({error: "Could not delete workout, please try again"})
            console.log(error, "ERROR")
        }
    }
}


