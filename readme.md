#NodePop
Exercise to Keepcoding Web Developer Bootcamp in node.

## Install dependencies
npm install

## Initialize and install examples in the database
npm run installDB 

## Start
npm start

## API v1 info

Access to api: `www.domain.com/apiv1/...`

### Security

The API uses JSON Web Token to handle users.

### Register user
First you will need to call /usuarios/register to create a user.


### Authenticate user
Then call /usuarios/authenticate to obtain a token.


Next calls will need to have the token in:

    Header: x-access-token: eyJ0eXAiO...
    Body: { token: eyJ0eXAiO... }
    Query string: ?token=eyJ0eXAiO...

### Language

All requests that return error messages are localized to spanish, if you want to change language make the request with the header accept-language set to other language, i.e. Accept-Language: en

### Error example
```
{
  "ok": false,
  "error": {
    "code": 401,
    "message": "User not found"
  }
}
```
### POST /usuarios/register

You must to send a POST request with input body: { nombre, email, clave}

Result:
```
{
  "ok": true,
  "message": "User created!"
}
```
### POST /usuarios/authenticate

The you must to send a POST request to authenticate and obtain a token

Input Body: { email, clave }

Result:
```
{
  "success": true,
  "token": "eyJhbG..."
}
```
### GET /anuncios

Input Query:

- start: {int} skip records
- limit: {int} limit to records
- tag: {string} tag name to filter
- venta: {bool} filter by venta or not
- precio_min: {int} minimun price
- precio_max: {int} maximun price
- nombre: {string} filter names by string

Input query example: `?start=0&limit=2&tag=mobile&venta=true&precio_min=10&nombre=bi`

Result:
```
{
  "success": true,
  "data": {
    "rows": [
      {
        "_id": "58c8232cf9fc0923e8c7ce36",
        "nombre": "Bicicleta",
        "venta": true,
        "precio": 230.15,
        "foto": "./images/ads/bici.jpg",
        "tags": [
          "lifestyle",
          "motor"
        ]
      }
    ]
  }
}
```
### GET /anuncios/tags

Return the list of available tags for the resource anuncios.

Result:
```
{
  "ok": true,
  "allowedTags": [
    "work",
    "lifestyle",
    "motor",
    "mobile"
  ]
}
```

