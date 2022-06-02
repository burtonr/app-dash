const express = require('express')
const path = require('path')
const cors = require('cors')
require('dotenv').config({ path: './local.env' })

const dbo = require('./db/conn')
const dashRoutes = require('./routes/dash')

const port = process.env.PORT || 3000
const app = express()
app.use(cors());
// app.use(express.json)

app.use(express.static(path.join(__dirname, '..', 'public')))
app.use('/api/dash', dashRoutes)

app.listen(port, () => {
    dbo.connect(function (err) {
        if (err) console.error(err)
        dbo.initialize()
    })
    console.info(`Listening on port: ${port}`)
})
