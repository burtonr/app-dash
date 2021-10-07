# App-Dash Server
This is the backend for the "App-Dash" project.

The API includes a basic `GET` request to load the dashboard with all the stored apps

There is also a `/admin` route that allows adding, editing, and removing apps.

## Run
There are currently 2 options for running the server:

- Directly
    - This will use the included `config/default.json` settings
    - To use different settings, create a new file and set the `NODE_ENV` environment variable to match that file name
```bash
cd src/

npm start
```

- With Docker
    - This will use a settings file `config/docker.json` that you will need to create
        - `cp config/default.json config/docker.json`
```bash
docker build -t app-dash-server .

docker run -p 8080:8080 app-dash-server
```

## Data
The data model of the `apps` collection is as follows:

```json
{
    "title": "Something",
    "description": "This is something",
    "url": "https://something.com",
    "imageUrl": "https://images.com/something-logo.png",
    "image": {
        "data": Binary('wgfhuwliguhw...'),
        "info": {
            "format": "png",
            ...
        }
    }
}
```

There is also a collection of `user`. This contains the salt-ed admin password for loggin in if it's configured.

```json
{
    "password": "$2a$08$mmxdbJXQcg8w.Iqxb1en5.8pS3P8IXwXdNi06I.CLYS2yl6AJlqhi"
}
```
