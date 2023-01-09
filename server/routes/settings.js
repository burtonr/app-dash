const express = require('express')
const router = express.Router()
const mw = require('../middleware/auth')
const dbo = require('../db/conn')

const disableAuth = process.env.DISABLE_AUTH === 'true'

router.get('/', (req, res) => {
    const status = {
        authDisabled: disableAuth,
        adminOnly: false, // TODO: Future use
    }
    res.send(status)
})

module.exports = router