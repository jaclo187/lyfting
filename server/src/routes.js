const Authentication = require('./controllers/Authentication')
const AuthenticationPolicy = require('./policies/AuthenticationPolicy')
const Workouts = require('./controllers/Workouts')

module.exports = (app) => {
    app.post('/register', AuthenticationPolicy.register, Authentication.register)
    app.post('/login', Authentication.login)
    app.post('/workouts', Workouts.index)
}