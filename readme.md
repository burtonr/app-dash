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

Add a new application to the dashboard with a Title and URL, then, when you load the default page, simply click the link and the page will open in a new tab. No more remembering IP addresses, or managing a large bookmarks list. The link images are stored (resized) with the data so that there are no file permissions issues, or lost files.

If you login with an administrator, or editor account, you can also edit and remove links.

The dashboard can be made to allow anonymous users so it can be used as a default landing page for your network, or secured with individual credentials so only logged in users can see the links.

## Run

### Configuration

Copy the `.env.sample` with the new name: `.env`

```bash
cp ./.env.sample ./.env
```

Adjust the values of the variables to work with your specific setup

- Settings:
  - `PORT`
    - This is the port number that the app will listen on
    - Default: `3000`
  - `MONGO_URI`
    - This is the full MongoDB connection string. The sample is pre-filled with the value for the included Docker Compose instance
  - `API_KEY`
    - This is the key used to sign the app's JWT token for verifying user access
  - `DISABLE_AUTH`
    - This will allow any user to access and modify the app data. Value must be _exactly_ `true`
    - Default: `'false'`

### All Inclusive with Compose

To start and run the full App Dash with server and database, simply run the `docker-compose` file

```shell
docker-compose up
```

This will build the containers from source if the images do not already exist. The MongoDB database container does not include a mounted volume, so all the data will be deleted when the container is removed. If you wish to keep your data, add a `volumes:` section to the `docker-compose.yml` file as shown:

```yaml
mongo:
  image: mongo:5.0
  restart: always
  # > Add volumes section
  volumes:
    - ./data:/data/db
  # Remaining existing file below
  environment: ...
```

## Development

There are `local:` scripts available to start up the MongoDB container, and seed it with _lorem ipsum_ values to aid in development.

---

```
npm run local:seed
```
This script will start the MongoDB container, then prompt for the number of items to add to the database.

> This command can be run multiple times to add more items to the database as desired

There is also a "clear all" option that will remove _all_ items from the local database.

---

```
npm run local:watch
```
This script will set the `MONGO_URI` environment variable to the local MongoDB URI so that you can keep your `.env` file pointed to your personal database while debugging, or testing, features. Then, the script will call the `watch` script.

---

```
npm run local:start
```
Similar to the `local:watch` script, this sets the `MONGO_URI` environment variable to the local MongoDB URI, then calls the `start` script.

---

```
npm run local:stop
```
This script will stop the local MongoDB container (and the app-dash container, if it's running).

> If you have not configured `volumes:` in the `docker-compose.yml` file, all the stored data will be removed.

---

### Libraries and Packages

- Server specific
  - [ExpressJS](http://expressjs.com/)
  - [CORS](https://github.com/expressjs/cors)
  - [MongoDB](https://mongodb.github.io/node-mongodb-native/)
  - [dotenv](https://www.npmjs.com/package/dotenv)
  - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
  - [bcryptjs](https://www.npmjs.com/package/bcrypt)
  - [sharp](https://www.npmjs.com/package/sharp)
- Client specific
  - [React](https://reactjs.org/)
  - [React-Router-Dom](https://reactrouter.com/web/guides/quick-start)
  - [Redux Toolkit](https://redux-toolkit.js.org/)
    - [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
  - [Material UI](https://mui.com/)
  - [Formik](https://formik.org/docs/overview)
    - with [Yup](https://github.com/jquense/yup#readme) validation
- Dev only
  - [Babel](https://babeljs.io/docs/)
  - [Webpack](https://webpack.js.org/concepts/)
  - [nodemon](https://nodemon.io/)
  - [Faker](https://fakerjs.dev/)
  - [Inquirer](https://github.com/SBoudrias/Inquirer.js)
