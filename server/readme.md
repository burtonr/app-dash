# App-Dash Server
This is the backend for the "App-Dash" project.

The API includes a basic `GET` request to load the dashboard with all the stored apps

There is also a `/admin` route that allows adding, editing, and removing apps.


## Data
The data model of the `apps` collection is as follows:

```json
{
    "title": "Something",
    "description": "This is something",
    "url": "https://something.com",
    "imageUrl": "https://images.com/something-logo.png"
}
```

There is also a collection of `user`. This contains the salt-ed admin password for loggin in if it's configured.

```json
{
    "password": "$2a$08$mmxdbJXQcg8w.Iqxb1en5.8pS3P8IXwXdNi06I.CLYS2yl6AJlqhi"
}
```
