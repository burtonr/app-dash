# App Dash Client (React)
This is the main UI for the "App-Dash" project.

It's built with [React](https://reactjs.org/) and [MaterialUI](https://mui.com/)

## Run
The client can be run as a Docker container, or locally for development.

### Docker container
The container uses an entrypoint script that will read the environment variables that start with `REACT_APP_` and add them to the `window.ENV` object.

> Thanks to [axelhzf](https://github.com/axelhzf)'s repo: [create-react-app-docker-environment-variables](https://github.com/axelhzf/create-react-app-docker-environment-variables)

This is how the api url is accessed at runtime allowing you to deploy this client code using different backends as desired.

- First, build the image
    
```shell
docker build -t app-dash-client .
```

- Then, run the container and map the port
    - Be sure to set the environment variable for the `REACT_APP_DASH_API_URL`

```shell
docker run -p 3001:80 -e REACT_APP_DASH_API_URL='http://localhost:9090' app-dash-client
```
    
- Access the site at [http://localhost:3001](http://localhost:3001)

### Locally
- First, be sure the node_modules are installed
```shell
npm i --silent
```
    
- Invoke the `start` command from `react-scripts`
    - The URL for the server is set in the `.env` file as a default to the localhost server
    - See the React docs [Adding Custom Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/) for ways to override this.

```shell
npm start
```

- Access the site at [http://localhost:3000](http://localhost:3000)


## Create React App (Generated)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

- `npm start`
    - Runs the app in the development mode.
    - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

        - The page will reload if you make edits.
        - You will also see any lint errors in the console.

- `npm test`
    - Launches the test runner in the interactive watch mode.
        - See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

- `npm run build`
    - Builds the app for production to the `build` folder.
    - It correctly bundles React in production mode and optimizes the build for the best performance.

        - The build is minified and the filenames include the hashes.
        - Your app is ready to be deployed!

    - See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
