const { MongoClient } = require('mongodb')
const uri = process.env.MONGO_URI
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

var _db;

module.exports = {
    connect: function (callback) {
        client.connect(function (err, db) {
            if(db) {
                _db = db.db('app-dash')
                console.info('Connected to MongoDB')
            }
            return callback(err)
        })
    },
    initialize: function () {
        console.info('Initializing the DB')
    },
    getDb: function () {
        return _db
    }
}