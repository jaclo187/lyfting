const {workout,  set, set_exercise_log , exercise/*, exercise_type,  musclegroup */ } = require('../models')
const config = require('../config/config')
const jwt = require('jsonwebtoken')
const mysql = require('mysql2/promise');
let conn = undefined

const connect = async () => {
    conn = await mysql.createConnection(config.db);
    conn.on('error', error => {
        connect() //Restarts connection if server closes connection https://github.com/sidorares/node-mysql2/issues/836#issuecomment-414281593
        console.log(error, "MYSQL CONNECTION LOST")
    })
};

module.exports = {
    async index (req, res) {
        try {
            const decode = jwt.verify(req.body.token, config.jwt.secret);
            //this code down here is an absolute mess but it works
            if(decode){
                if(!conn) await connect()
                let query,
                params

                //query depending on all or single workout
                if(req.body.id) {
                    query = `SELECT workout.id AS id, workout.date AS date, workout.\`name\` AS \`name\`, \`set\`.id AS set_id, set_exercise_log.id AS set_log_id, set_exercise_log.weight AS weight, set_exercise_log.reps AS reps, set_exercise_log.time AS time, exercise.\`name\` AS exercise, musclegroup.name AS musclegroup, exercise_type.name AS type
                    FROM workout
                    LEFT JOIN \`set\` ON \`set\`.fk_workout = workout.id
                    LEFT JOIN set_exercise_log ON \`set\`.id = set_exercise_log.fk_set
                    LEFT JOIN exercise ON set_exercise_log.fk_exercise = exercise.id
                    LEFT JOIN exercise_type ON exercise.fk_type = exercise_type.id
                    LEFT JOIN musclegroup ON exercise.fk_musclegroup = musclegroup.id
                    WHERE workout.fk_user = ? AND workout.id = ?;`
                    params = [decode.id, req.body.id]
                } else {
                    query = `SELECT workout.id AS id, workout.date AS date, workout.\`name\` AS \`name\`, \`set\`.id AS set_id, set_exercise_log.id AS set_log_id, set_exercise_log.weight AS weight, set_exercise_log.reps AS reps, set_exercise_log.time AS time, exercise.\`name\` AS exercise, musclegroup.name AS musclegroup, exercise_type.name AS type
                    FROM workout
                    LEFT JOIN \`set\` ON \`set\`.fk_workout = workout.id
                    LEFT JOIN set_exercise_log ON \`set\`.id = set_exercise_log.fk_set
                    LEFT JOIN exercise ON set_exercise_log.fk_exercise = exercise.id
                    LEFT JOIN exercise_type ON exercise.fk_type = exercise_type.id
                    LEFT JOIN musclegroup ON exercise.fk_musclegroup = musclegroup.id
                    WHERE workout.fk_user = ?;`
                    params = [decode.id]
                }

                //executing query
                let rows = await conn.execute(query, params)
                let result = rows[0],
                returnObj = {}

                //iterating result -> each result child contains 1 setlog with corresponding workout & set
                for (let i = 0; i < result.length; i++) {
                    const row = result[i]
                    //if workout does not exist yet
                    if( !Object.prototype.hasOwnProperty.call(returnObj, row.id) ){
                        returnObj[row.id] = {}
                        returnObj[row.id].id = row.id
                        returnObj[row.id].sets = {}
                        returnObj[row.id].name = row.name
                        returnObj[row.id].date = row.date
                    }
                    //if set is not defined yet
                    if( returnObj[row.id].sets[row.set_id] == undefined ){
                        let set = {}
                        set.id = row.set_id
                        set.exercise = row.exercise === undefined ? null : row.exercise
                        set.type = row.type === undefined ? null : row.type
                        set.musclegroup = row.musclegroup === undefined ? null : row.musclegroup
                        set.data = []
                        returnObj[row.id].sets[row.set_id] = set
                    }
                    //inserting setlog data into set
                    let data = {
                        id: row.set_log_id,
                        weight : row.weight,
                        time : row.time,
                        reps : row.reps
                    }
                    returnObj[row.id].sets[row.set_id].data.push(data)
                }
                res.status(200).send(JSON.stringify({workouts: returnObj})) 
            }
        } 
        catch(err) {
            console.log(err)
            res.status(400).send({error: "Your session is no longer valid"})
        }
    },

    async post(req, res) {
        try {
            if(!conn) await connect()
            const decode = jwt.verify(req.body.token, config.jwt.secret);
            if(decode){
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
            if(!conn) await connect()
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
            if(!conn) await connect()
            const decode = jwt.verify(req.headers.authorization, config.jwt.secret)
            if(decode && req.params.id){
                await workout.destroy({where: {id: req.params.id}})
                res.status(200)
            } else {
                res.status(402).send({error: "Could not delete workout, please try again"})
                console.log(req.body)
                console.log(req.headers)
            }
        } catch (error) {
            res.status(402).send({error: "Could not delete workout, please try again"})
            console.log(error, "ERROR")
        }
    },
    
    async newSet(req, res) {
        try{
            if(!conn) await connect()
            const decode = jwt.verify(req.body.token, config.jwt.secret)
            if(decode){
                const newSet = await set.create({fk_workout: req.body.workoutID})
                res.send(newSet.toJSON())
            }
        } catch(err) {
            console.log(err)
            res.status(400).send({error: "Your session is no longer valid or another error occured. Please try again"})
        }
        
    },

    async newSetLog(req, res) {
        try{
            if(!conn) await connect()
            const decode = jwt.verify(req.body.token, config.jwt.secret)
            if(decode){
                const exerciseFound = await exercise.findOne({where: {name: req.body.exercise}})
                let exerciseID = exerciseFound.toJSON().id
                const newSetLog = await set_exercise_log.create({fk_exercise: exerciseID, fk_set: req.body.setID})
                res.send(newSetLog.toJSON())
            }
        } catch(err) {
            console.log(err, "ERROR")
            res.status(400).send({error: "Something went wrong"})
        }
        
    },

    async updateSetLog(req, res) {
        const decode = jwt.verify(req.body.token, config.jwt.secret)
        if(decode){
            try {
                if(!conn) await connect()
                await set_exercise_log.update(
                    {
                        weight: req.body.setLog.weight,
                        time: req.body.setLog.time,
                        reps: req.body.setLog.reps
                    },
                    {
                        where: {
                            id: req.body.setLog.id
                        }
                    }
                )
                res.status(200).send()
            } catch (error) {
                res.status(500).send({
                    error: "Set could not be updated."
                })
            }
        } else{
            res.status(500).send({error: "Please log in to use our app"})
        }
    },

    async updateSetLogExercise(req, res) {
        
        const decode = jwt.verify(req.body.token, config.jwt.secret)
        
        if(decode){
            try {
                if(!conn) await connect()
                const exerciseFound = await exercise.findOne({where: {name: req.body.exercise}})
                let exerciseID = exerciseFound.toJSON().id
                let result = await set_exercise_log.update(
                    {
                        fk_exercise: exerciseID
                    },
                    {
                        where: {
                            fk_set: req.body.setID
                        }
                    }
                )
                if(result > 0) res.status(200).send()
                else res.status()
            } catch (error) {
                res.status(500).send({
                    error: "Exercise could not be updated."
                })
            }
        } else{
            res.status(401).send({error: "Please log in to use our app"})
        }
    },

    async deleteSet(req, res) {

        const decode = jwt.verify(req.body.token, config.jwt.secret)
        if(!req.body.setID) res.status(300).send({msg: "Please provide set id"})
        if(decode){
            try{
                if(!conn) await connect()
                await set.destroy({where: {id: req.body.setID}})
                res.status(200).send()
            } catch (error) {
                console.log(error, "ERROR")
                res.status(500).send({error: "Internal Server Error"})
            }
        } else{
            res.status(401).send({error: "Please log in to use our app"})
        }

    }
}


