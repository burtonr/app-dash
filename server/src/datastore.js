const { MongoClient } = require('mongodb');
// const connStr = process.env.DB_CONN
// const client = new MongoClient(connStr, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

var _datastore;

module.exports = {
    connectToDataStore: function (config, callback) {
        const client = new MongoClient(config.connection, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        client.connect((err, db) => {
            if (db) {
                _datastore = db.db("app-dash");
                console.info('Connected to MongoDB');
            }
            return callback(err);
        });
    },

    getDataStore: function () {
        return _datastore;
    }
}