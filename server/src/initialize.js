const dbo = require('./datastore');

module.exports = async (config) => {
    console.log('Initializing app-dash...');
    if(config.authorize)
    {
        let admin = await dbo.getDataStore().collection("user").findOne();

        if(!admin) {
            // TODO: Create an admin user from the config.adminPass
            console.log('Admin user not configured');
        } else {
            console.log('Admin user already setup');
        }
    } else {
        console.warn('App-Dash running without authorization');
    }

    console.info('App-Dash initialized!');
}