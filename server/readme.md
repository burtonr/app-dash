# App-Dash Server
This is the backend for the "App-Dash" project.

The API includes the following routes:
    - `/api/dash`
    - `/api/dash/settings`
    - `/api/dash/auth`
    - `/api/dash/admin`

## Routes and Functionality

- `/api/dash`
    - `GET /`: Get all of the "apps" stored in the configured database.
        - See below for the data structure
    - `POST /`: Insert a new item
        - This function will pull the image from the provided `imageUrl`, and resize it to optimize storage and page performance
    - `PUT /{id}`: Update and existing item with the values provided.
    - `DELETE /{id}`: Delete the item from the database
- `/api/dash/settings`
    - `GET /`: Get the application settings configured in the database
        - `authDisabled`, etc...
- `/api/dash/auth`
    - `POST /signin`: Provide the username and encrypted password
        - See below for the data structure returned
- `/api/dash/admin`
    - `POST /user`: Add a new user with role


with a `GET` request to load the dashboard with all the stored apps, as well as `POST` to create, `PUT` to update, and `DELETE` to remove app items.

There is also a `/admin` route that allows adding users.

## Run
The server and UI are run together as the main application. Refer to the [main readme](../readme.md) for more information

## Data
The data model of the `apps` collection is as follows:

#### Item

This is a sample data structure of an item that is returned, or POST-ed

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

#### User

This is a sample data structure of a user returned from the `/api/dash/auth/signin` endpoint

```json
{
    "id": "629f4f338815727d1fe29dda",
    "username": "administrator",
    "role": "admin",
    "accessToken": "eyJhbGci0iJIUzI1NiIsInR5..."
}
```

The `role` property is a MongoDB ObjectId from the `roles` collection. This is pre-populated with the following values:
- admin
- editor
- user

This is a sample data structure of a request to add a new user via the `api/dash/admin/user` endpoint

```json
{
    "username": "Scuba Steve",
    "role": "editor",
    "password": "secret"
}
```

#### Settings

This is a sample data structure of the server settings returned from the `/api/dash/settings` endpoint

```json
{
    "authDisabled": true,
    "adminOnly": false
}
```