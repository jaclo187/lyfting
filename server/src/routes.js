const Authentication = require('./controllers/Authentication')
const AuthenticationPolicy = require('./policies/AuthenticationPolicy')

module.exports = (app) => {
    app.post('/register', AuthenticationPolicy.register, Authentication.register)
    app.post('/login', Authentication.login)
}