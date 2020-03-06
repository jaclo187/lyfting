const Authentication = require('./controllers/Authentication')
const AuthenticationPolicy = require('./policies/AuthenticationPolicy')
const Workouts = require('./controllers/Workouts')
const Exercises = require('./controllers/Exercises')

module.exports = app => {
    /*Authentication */
    app.post('/register', AuthenticationPolicy.register, Authentication.register)
    app.post('/login', Authentication.login)
    /*Workouts */
    app.post('/workouts', Workouts.index)
    app.post('/workouts/create', Workouts.post)
    app.patch('/workouts/update', Workouts.update)
    app.delete('/workouts/delete/:id', Workouts.delete)

    app.post('/workouts/set/new', Workouts.newSet)
    app.post('/workouts/set/log', Workouts.newSetLog)

    app.patch('/workouts/set/log/update', Workouts.updateSetLog)
    app.patch('/workouts/set/exercise/update', Workouts.updateSetLogExercise)
    /*Exercises */
    app.get('/exercises', Exercises.index)
}