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

app.listen(port, () => {
    dbo.connect(async function (err) {
        if (err)
            console.error(err)
        await dbo.initialize()
    })
    console.info(`Listening on port: ${port}`)
})
