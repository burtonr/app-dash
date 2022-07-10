const express = require('express')
const router = express.Router()
const mw = require('../middleware/auth')
const dbo = require('../db/conn')
const bcryptjs = require('bcryptjs')

router.get('/user', async (req, res) => {

})

router.post('/user', [mw.verifyToken, mw.isAdmin], async (req, res) => {
    let db = dbo.getDb();
    let userExists = await db.collection('users').countDocuments({ username: req.body.username })
    if (userExists) {
        res.status(409).send({ message: 'username is already in use' })
        return
    }
    let roleExists = await db.collection('roles').findOne({ name: req.body.role })
    if (!roleExists) {
        res.status(400).send({ message: 'role provided is not valid' })
        return
    }

    let newUser = {
        username: req.body.username,
        role: roleExists._id,
        password: bcryptjs.hashSync(req.body.password)
    }
    let createdUser = await db.collection('users').insertOne(newUser)
    if (createdUser.insertedId) {
        res.status(202).send({ message: 'user added' })
        return
    } else {
        res.status(500).send({ message: 'user could not be created' })
    }
})

module.exports = router;
