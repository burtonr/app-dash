const express = require('express')
const router = express.Router()
const dbo = require('../db/conn')

router.get('/', (req, res) => {
    let db = dbo.getDb();
    db.collection("apps")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err
            res.json(result)
        });
})

module.exports = router