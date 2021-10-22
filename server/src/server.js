const config = require('config');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');

const appDashConfig = config.get('appDash');
const mongoConfig = config.get('mongo');

const dbo = require('./datastore');
const initialize = require('./initialize');
const dashRoutes = require('./dashRoutes.js');

const AuthHandlers = require('./authHandlers');
const authHandler = new AuthHandlers(appDashConfig);

const adminRoutes = require('./adminRoutes.js')(authHandler);

const app = express();

// TODO: Separate app and server
// https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/projectstructre/separateexpress.md
app.use(express.json());
// const corsOptions = {
//     origin: '*',
//     // origin: appDashConfig.clientHost,
//     optionsSuccessStatus: 200,
//     methods: ['GET', 'POST', 'PUT']
// }
// app.use(cors(corsOptions));
app.use(cors());
app.use(helmet());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: appDashConfig.jwtSecret,
}))

app.use(function (req, res, next) {
    var err = req.session.error;
    var msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    
    if (err) console.warn('Session error:', err);
    if (msg) console.info('Session message:', msg);
    next();
});

app.get('/logout', authHandler.logoutHandler);
app.post('/login', authHandler.loginHandler);

app.use('/admin', adminRoutes);
app.use('/', dashRoutes);

app.listen(appDashConfig.port, () => {
    dbo.connectToDataStore(mongoConfig, function (err) {
        if (err) console.error(err);
        initialize(appDashConfig);
    });
    console.info(`Listening on port ${appDashConfig.port}`);
    console.info('UPDATED');
})
