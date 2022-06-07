const bcryptjs = require('bcryptjs');
const { MongoClient, ServerApiVersion, Db } = require('mongodb')
const uri = process.env.MONGO_URI
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
})

var _db;

module.exports = {
    connect: function (callback) {
        client.connect(function (err, db) {
            if (db) {
                _db = db.db('app-dash')
                console.info('Connected to MongoDB')
            }
            return callback(err)
        })
    },
    initialize: async function () {
        let addedRoles = await checkAndAddRoles()
        let addedAdmin = await checkAndAddAdmin()

        console.info(`Roles added? ${addedRoles} | Admin user added? ${addedAdmin}`)

        if (!addedRoles && !addedAdmin)
            console.info('MongoDB already initialized. No changes made')
        
        console.info('MongoDB initialization complete')
    },
    getDb: function () {
        return _db
    }
}

async function checkAndAddRoles() {
    let rolesCollection = _db.collection('roles')
    let existingRoleCount = await rolesCollection.estimatedDocumentCount()
    if (existingRoleCount == 0) {
        let adminRole = { name: 'admin' }
        let editorRole = { name: 'editor' }
        let userRole = { name: 'user' }
        await rolesCollection.insertMany([adminRole, editorRole, userRole])
        return true
    }
    return false
}

async function checkAndAddAdmin() {
    let adminRole =  await _db.collection('roles').findOne({name: 'admin'})
    let usersCollection = _db.collection('users')
    let adminUser = await usersCollection.findOne({"role": adminRole._id})
    if (!adminUser) {
        await usersCollection.insertOne({
            username: 'admin',
            password: bcryptjs.hashSync('admin'),
            role: adminRole._id
        })
        return true
    }
    return false
}
