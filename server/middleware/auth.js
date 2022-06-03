const jwt = require('jsonwebtoken')
const dbo = require('../db/conn')
const apiKey = process.env.API_KEY

module.exports = {
    verifyToken: function (req, res, next) {
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
    },
    // isAdmin: function (req, res, next) { }
}