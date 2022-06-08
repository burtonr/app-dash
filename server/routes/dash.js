const express = require('express')
const router = express.Router()
const ObjectId = require('mongodb').ObjectId;
const mw = require('../middleware/auth')
const dbo = require('../db/conn')
const imgSvc = require('../services/images')

router.get('/', (req, res) => {
    let db = dbo.getDb();
    db.collection("apps")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err
            res.json(result)
        });
})

router.post('/', [mw.verifyToken, mw.isEditor], async (req, res) => {
    let db = dbo.getDb();

    let smImg;

    if (req.body.imageUrl) {
        smImg = await imgSvc.downloadAndResize(req.body.imageUrl);
    }

    let newItem = {
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        imageUrl: req.body.imageUrl,
        image: smImg,
    };
    let insertResponse = await db.collection('apps').insertOne(newItem); 
    let dbItem = await db.collection('apps').findOne({ _id: ObjectId(insertResponse.insertedId) })

    let result = {
        dbResponse: insertResponse,
        newItem: dbItem
    }
    res.json(result);
})

module.exports = router