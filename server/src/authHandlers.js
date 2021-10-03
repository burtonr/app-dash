const dbo = require('./datastore');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class AuthHandlers {
    constructor(appConfig) {
        this.appConfig = appConfig;
    }
    
    hashPassword = (pwd) => {
        // DEV: This is copied in ./initialize.js!
        bcrypt.hashSync(pwd, 8)
    }

    verifyMiddleware = (req, res, next) => {
        if (this.appConfig.authorize) {
            let token = req.headers["x-access-token"];

            if (!token) {
                return res.status(403).send({ message: "No token provided!" });
            }

            jwt.verify(token, this.appConfig.jwtSecret, (err, decoded) => {
                if (err) {
                    return res.status(401).send({ message: "Unauthorized!" });
                }
                req.userId = decoded.id;
            });
        }
        next();
    }

    logoutHandler = (req, res) => {
        req.session.destroy();
        res.status(200).end();
    }

    loginHandler = async (req, res) => {
        let db_connect = dbo.getDataStore();
        let admin = await db_connect.collection("user").findOne();

        if (!admin) {
            res.status(503).send({ message: "No admin user configured" });
        } else {
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                admin.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: admin._id }, this.appConfig.jwtSecret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                id: admin._id,
                accessToken: token
            });
        }
    }
}

module.exports = AuthHandlers;