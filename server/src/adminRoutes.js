const router = require('express').Router();
const ObjectId = require('mongodb').ObjectId;
const dbo = require('./datastore');

module.exports = function(authHandler) {
    router.use(authHandler.verifyMiddleware);

    router.post('/password', (req, res) => {
        let hashedPwd = authHandler.hashPassword(req.body.newPassword);
    
        let newPwd = {
            $set: {
                password: hashedPwd,
            },
        };
    
        let db_connect = dbo.getDataStore();
        db_connect
            .collection('user')
            .updateOne({ _id: ObjectId(req.params.itemId) }, newPwd, (err) => {
                if (err) throw err;
                console.log(`admin password updated`);
                res.status(202).end();
            });
    });
    
    router.post('/', (req, res) => {
        let db_connect = dbo.getDataStore();

        console.log('Request Body:');
        console.log(req.body);
        console.log('Request Title:');
        console.log(req.body.title);

        let newItem = {
            title: req.body.title,
            description: req.body.description,
            url: req.body.url,
            imageUrl: req.body.imageUrl,
        };
        db_connect
            .collection('apps')
            .insertOne(newItem, (err, cmdRes) => {
                if (err) throw err;
                res.json(cmdRes);
            });
    });
    router.put('/:itemId', (req, res) => {
        let db_connect = dbo.getDataStore();

        console.log('Request:');
        console.log(req.body.title);

        let newvalues = {
            $set: {
                title: req.body.title,
                description: req.body.description,
                url: req.body.url,
                imageUrl: req.body.imageUrl,
            },
        };
        db_connect
            .collection('apps')
            .updateOne({ _id: ObjectId(req.params.itemId) }, newvalues, (err, cmdRes) => {
                if (err) throw err;
                console.log(`Item ${req.params.itemId} updated`);
                res.json(cmdRes);
            });
    });
    router.delete('/:itemId', (req, res) => {
        let db_connect = dbo.getDataStore();
        db_connect
            .collection('apps')
            .deleteOne({ _id: ObjectId(req.params.itemId) }, (err, obj) => {
                if (err) throw err;
                console.log(`Item ${req.params.itemId} was deleted`);
                res.status(obj.deletedCount !== 0 ? 200 : 304).end();
            });
    });

    return router;
};
