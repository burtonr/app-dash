const express = require('express')
const router = express.Router()
const dbo = require('../db/conn')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const apiKey = process.env.API_KEY

router.post('/signin', async (req, res) => {
    // TODO: Add check for "authDisabled" to skip signin
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
        } else {
            res.status(401).send({ message: "Username or password is not valid" })
        }
    } else {
        res.status(400).send({ message: "Username does not exist" })
    }
})

// TODO: Add password reset route

module.exports = router
