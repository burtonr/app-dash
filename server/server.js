const process = require('process')
const express = require('express')
const path = require('path')
const cors = require('cors')

const dbo = require('./db/conn')
const routes = require('./routes')


const port = process.env.PORT || 3000
const app = express()
app.use(cors());
app.use(express.json())

app.use(express.static(path.join(__dirname, '..', 'public')))
app.use('/api/dash/settings', routes.settingsRoutes)
app.use('/api/dash/auth', routes.authRoutes)
app.use('/api/dash/admin', routes.adminRoutes)
app.use('/api/dash', routes.dashRoutes)

// Unknown route handler
app.use(function (req, res, next) {
    return res.status(404).send({ message: 'Route: "' + req.url + '" not found. Contact the administrator' });
});

app.use(function (err, req, res, next) {
    return res.status(500).send({ message: 'Unknown server error occurred.', error: err });
});

app.listen(port, () => {
    dbo.connect(async function (err) {
        if (err)
            console.error(err)
        await dbo.initialize()
    })
    console.info(`Listening on port: ${port}`)
})

// SIGINT and SIGTERM handlers to cooperate when running in a container environment
process.on('SIGINT', () => {
    console.info("Server Interrupted")
    process.exit(0)
})

process.on('SIGTERM', () => {
    console.info("Server Terminated")
    process.exit(0)
})
