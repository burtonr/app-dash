const jwt = require('jsonwebtoken')
const dbo = require('../db/conn')
const ObjectId = require('mongodb').ObjectId;
const apiKey = process.env.API_KEY

function verifyToken(req, res, next) {
    let token = req.headers['x-access-token']
    if (!token) {
        res.status(403).send()
        return
    }

    jwt.verify(token, apiKey, (err, decoded) => {
        if (err) {
            res.status(401).send()
            return
        }

        req.userId = decoded.id
        next()
    })
}

async function isAdmin(req, res, next) {
    let db = dbo.getDb()
    let user = await db.collection('users').findOne({ _id: ObjectId(req.userId) })
    if (user) {
        let role = await db.collection('roles').findOne({ _id: user.role })
        if (role && role.name == 'admin') {
            next()
            return
        }
    }

    res.status(403).send()
    return
}

async function isEditor(req, res, next) {
    let db = dbo.getDb()
    let user = await db.collection('users').findOne({ _id: ObjectId(req.userId) })
    if (user) {
        let role = await db.collection('roles').findOne({ _id: user.role })
        if (role && (role.name == 'editor' || role.name == 'admin')) {
            next()
            return
        }
    }
    
    res.status(403).send()
    return
}

module.exports = {
    verifyToken,
    isAdmin,
    isEditor
}