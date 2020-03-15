const path = require("path")
const fs = require("fs")
require('dotenv').config({ path: path.join(__dirname, '.env') })
const express = require("express")
const bodyParser = require('body-parser')
const cors = require("cors")
const {sequelize} = require("./models")
const morgan = require("morgan")
const config = require('./config/config')

const https = require('https');
const privateKey = fs.readFileSync(path.resolve("/etc/letsencrypt/live/lyfting.fit/privkey.pem"), 'utf8');
const certificate = fs.readFileSync(path.resolve("/etc/letsencrypt/live/lyfting.fit/fullchain.pem"), 'utf8');

const credentials = {key: privateKey, cert: certificate};

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.resolve(__dirname + '/../public')));
    app.get(/.*/, (req, res) => res.sendFile(path.resolve(__dirname + '/../public/index.html')))
}

const httpsServer = https.createServer(credentials, app);

sequelize.sync()
    .then(() => {
        //app.listen(config.port)
        httpsServer.listen(config.port)
        console.log(`Server running on port ${config.port}`)
    })
