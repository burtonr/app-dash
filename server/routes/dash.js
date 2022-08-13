const express = require('express')
const router = express.Router()
const ObjectId = require('mongodb').ObjectId;
const mw = require('../middleware/auth')
const dbo = require('../db/conn')
const imgSvc = require('../services/images')

router.get('/', (req, res, next) => {
    let db = dbo.getDb();
    db.collection("apps")
        .find({})
        .toArray(function (err, result) {
            if (err) next(err)
            res.json(result)
        });
})

router.post('/', [mw.verifyToken, mw.isEditor], async (req, res, next) => {
    let db = dbo.getDb();

    let smImg;

    if (req.body.imageUrl) {
        try {
            image = await imgSvc.downloadAndResize(req.body.imageUrl);
        } catch (err) {
            console.log('Unable to resize item image')
        }
    }

    let newItem = {
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        imageUrl: req.body.imageUrl,
        image: smImg,
    };
    try {
        let insertResponse = await db.collection('apps').insertOne(newItem);
        let dbItem = await db.collection('apps').findOne({ _id: ObjectId(insertResponse.insertedId) })

        let result = {
            dbResponse: insertResponse,
            newItem: dbItem
        }
        res.json(result);
    } catch (err) {
        next(err)
    }
})

// TODO: Change to PATCH and only change updated fields
router.put('/:itemId', async (req, res, next) => {
    let db_connect = dbo.getDb();

    // TODO: Pull item from DB first, then compare the imageUrls
    // to determine if it's changed to re-download
    let image = req.body.image;

    if (!image && req.body.imageUrl) {
        try {
            image = await imgSvc.downloadAndResize(req.body.imageUrl);
        } catch (err) {
            console.log('Unable to resize item image')
        }
    }

    let newValues = {
        $set: {
            title: req.body.title,
            description: req.body.description,
            url: req.body.url,
            imageUrl: req.body.imageUrl,
            image,
        },
    };

    try {
        let updateResponse = await db_connect.collection('apps').updateOne({ _id: ObjectId(req.params.itemId) }, newValues);
        let dbItem = await db_connect.collection('apps').findOne({ _id: ObjectId(req.params.itemId) })

        let result = {
            dbResponse: updateResponse,
            updatedItem: dbItem
        }
        res.json(result);
    } catch (err) {
        next(err)
    }
});

router.delete('/:itemId', [mw.verifyToken, mw.isEditor], (req, res, next) => {
    let db_connect = dbo.getDb();
    db_connect
        .collection('apps')
        .deleteOne({ _id: ObjectId(req.params.itemId) }, (err, obj) => {
            if (err) next(err);
            console.log(`Item ${req.params.itemId} was deleted`);
            res.status(obj.deletedCount !== 0 ? 200 : 304).end();
        });
});

module.exports = router