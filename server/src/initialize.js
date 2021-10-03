const bcrypt = require('bcryptjs');
const dbo = require('./datastore');

module.exports = async (config) => {
    console.log('Initializing app-dash...');
    if (config.authorize) {
        let admin = await dbo.getDataStore().collection("user").findOne();

        if (!admin) {
            let pwdHash = bcrypt.hashSync(config.adminPass, 8)
            try {
                let db_connect = dbo.getDataStore();

                let res = 
                    await db_connect
                        .collection('user')
                        .insertOne({ password: pwdHash});
                if(res.acknowledged) {
                    console.info('Admin user created!');
                } else {
                    console.warn('Admin user insert was not successful');
                    console.warn(res);
                }
            } catch (err) {
                console.error('Inserting admin user failed');
                console.error(err);
            }
            
        } else {
            console.log('Admin user already setup');
        }
    } else {
        console.warn('App-Dash running without authorization');
    }

    console.info('App-Dash initialized');
}