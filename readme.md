# App Dash
A dashboard for your applications

This is very similar to the other popular application dashboards [Heimdall](https://heimdall.site/) and [Homer](https://github.com/bastienwirtz/homer), but uses the [MERN Stack](https://www.mongodb.com/mern-stack)


## Why not use one of those projects?

- Heimdall
    - Hasn't had a new release in 3 years
    - It includes a lot of additional features I'm not interested in
        - Foundation apps
        - Live tiles
    - It uses a local sqlite database
    - Written in PHP (something I'm not familiar with)
- Homer
    - Uses a local file for storage
        - ssh/ftp to add/change links
    - Same local file for configuration
        - Change page title, icon, etc in file
    - No backend/server side

## How it works
Add a new application to the dashboard with a Title and URL, then, when you load the default page, simply click the link and the page will open in a new tab. No more remembering IP addresses, or managing a large bookmarks list.

If you login as an administrator, you can also edit, and remove links.

The dashboard can be made to allow anonymous users so it can be used as a default landing page for your network, or secured behind a password so only select users can see the links.

## Run

### Server Configuration
The App-Dash and MongoDB configuration is set in the `server/src/config/default.json` file and read by the `config` package. 

[Read more about the config library](https://github.com/lorenwest/node-config#readme)

> If the `appDash.authorize` is set to false, you do not need to supply the `adminPass` or `jwtSecret` values

```json
{
    "appDash": { <- the configuration for the app-dash server
        "port": 8080, <- port number the server will listen on
        "authorize": false, <- enable password protection for add/edit/delete
        "adminPass": "", <- the default admin password
        "jwtSecret": "" <- the secret to be used with the token
    },
    "mongo": { <- the mongoDB configuration
        "connection": "" <- full connection string for your instance of MongoDB
    }
}
```

## Development

### Libraries and Packages
- Server
    - [ExpressJS](http://expressjs.com/)
    - [Config](https://github.com/lorenwest/node-config#readme)
    - [Helmet](https://helmetjs.github.io/)
    - [CORS](https://github.com/expressjs/cors)
    - [MongoDB](https://mongodb.github.io/node-mongodb-native/)
    - [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme)
    - [bcryptjs](https://github.com/dcodeIO/bcrypt.js#readme)
- Client
    - [React](https://reactjs.org/)
    - [React-Router-Dom](https://reactrouter.com/web/guides/quick-start)
    - [Material UI](https://mui.com/)
    - [Axios](https://axios-http.com/)