const express = require('express');
const router = express.Router();
const dbo = require('./datastore');

router.get('/', (req, res) => {
    let db_connect = dbo.getDataStore("app-dash");
    db_connect
        .collection("apps")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});
router.post('/', (req, res) => {
    console.log('Future logging info: site, user, etc...');
    res.end();
});

module.exports = router;