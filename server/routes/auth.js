const express = require('express')
const router = express.Router()
const dbo = require('../db/conn')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const apiKey = process.env.API_KEY
const disableAuth = process.env.DISABLE_AUTH

router.get('/init', async (req, res) => {
    const status = {
        authDisabled: disableAuth,
        adminOnly: false, // TODO: Future use
    }
    res.send(status)

})

router.post('/signin', async (req, res) => {
    const db = dbo.getDb()
    let foundUser = await db.collection('users').findOne({ username: req.body.username })
    if (foundUser) {
        let validPwd = bcryptjs.compareSync(req.body.password, foundUser.password)
        if (validPwd) {
            let token = jwt.sign({ id: foundUser._id }, apiKey, { expiresIn: 86400 })
            let role = await db.collection('roles').findOne(foundUser.role)
            res.status(200).send({
                _id: foundUser._id,
                username: foundUser.username,
                role: role.name,
                accessToken: token
            })
            return
        }
    }

    res.status(401).send({ message: "Username or password is not valid" })
})

// TODO: Add password reset route

module.exports = router
