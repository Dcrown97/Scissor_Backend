# ROUTES

This document outlines the request/response structure for the endpoints

## User Routes

### Create a user

To create a user, send a `POST` request to the `/api/register` route. The body will contain a json with properties indicated as the following:

```json
{
  "first_name": "Dara",
  "last_name": "Simi",
  "email": "dara2@gmail.com",
  "password": "***********"
}
```

If successful, you'll get a response like this:

```json
{
  "message": "Signup successful",
  "user": {
    "_id": "64904d4e221aa2fd4e01acbc",
    "first_name": "Dara",
    "last_name": "Simi",
    "email": "dara2@gmail.com",
    "__v": 0
  },
  "status": 200
}
```

### Login user

To login a user, send a `POST` request to the `/api/login` route. Supply your registered email and password in a json format to the body like this:

```json
{
  "email": "dara2@gmail.com",
  "password": "***********"
}
```

If successful, you'll get a response like this with a jwt authenticate/authorization token:

```json
{
  "user": {
    "_id": "64904d4e221aa2fd4e01acbc",
    "first_name": "Dara",
    "last_name": "Simi",
    "email": "dara2@gmail.com",
    "__v": 0
  },
  "token": "<token>",
  "message": "Logged in Successfully",
  "status": 200
}
```

## Scissor Routes

<details>
<summary>Something to note</summary>
Supply login credentials using bearer auth when sending requests to some of the protected routes listed below.
</details>

### Create a short URL

<details>
<summary> :sunglasses: </summary>
This route is only accessible to logged in users, so add the bearer token for authorization.
</details>

To create a short url, send a `POST` request to the `/api/short` route. The payload will contain a json object, An example request is shown below:

```json
{
  "origUrl": "https://baidu.com/"
}
```

If successful, you'll get a response like this:

```json
{
  "message": "Url shortened successfully",
  "url": {
    "urlId": "OY1ua_-g5",
    "origUrl": "https://baidu.com/",
    "shortUrl": "https://brief-lher.onrender.com/OY1ua_-g5",
    "clicks": 0,
    "author": "64904d4e221aa2fd4e01acbc",
    "date": "Mon Jun 19 2023 13:05:20 GMT+0000 (Coordinated Universal Time)",
    "_id": "64905290a652f786b1e990b4",
    "__v": 0
  },
  "status": 200
}
```

### Create a custom URL

<details>
<summary> :sunglasses: </summary>
This route is only accessible to logged in users, so add the bearer token for authorization.
</details>

To create a custom url, send a `POST` request to the `/api/custom` route. The payload will contain a json object, An example request is shown below:

```json
{
  "origUrl": "https://wikipedia.org/",
  "customUrl": "wiki"
}
```

If request is successful, you'll get a response like this:

```json
{
  "message": "Custome URl created",
  "newUrl": {
    "urlId": "wiki",
    "origUrl": "https://wikipedia.org/",
    "shortUrl": "https://brief-lher.onrender.com/wiki",
    "customUrl": "wiki",
    "clicks": 0,
    "author": "64904d4e221aa2fd4e01acbc",
    "date": "Mon Jun 19 2023 13:14:17 GMT+0000 (Coordinated Universal Time)",
    "_id": "649054a9a652f786b1e990b8",
    "__v": 0
  },
  "status": 200
}
```

### Download URL QR Code Link

To download the url code link, make a `GET` request to `https://chart.googleapis.com/chart` route. While supplying the following as params. The `CHL` is the short url link created(`https://brief-lher.onrender.com/OY1ua_-g5`)

```PARAMS
    chs    -     250x250

    cht    -     qr

    chl    -     https://brief-lher.onrender.com/OY1ua_-g5
```

If request is successful, you'll see a pictorial view of the QR code which you can scan.

### Visit the original link with the short link created

To visit the original link with the short url created, send a `GET` request to `/:urlId` with the urlId being the short name for the url created. For example:

Send a `GET` request to `/OY1ua_-g5` if successful you will be automatically redirected to the main url.

### See url analytics

<details>
<summary> :sunglasses: </summary>
This route is only accessible to logged in users, so add the bearer token for authorization.
</details>

To see url analytics make a `GET` request to `/api/visit/:id` supplying the `id` which is the short url id created. For example:

Send a `GET` request to `/api/visit/64905290a652f786b1e990b4`

If request is successful, you'll get a response like this:

```json
{
  "status": 200,
  "data": [
    {
      "_id": "64905c3f56c3ae486c0d0c30",
      "location": "NG, , ",
      "ipAddress": "102.89.43.6",
      "device": "Other 0.0.0 on Other 0.0.0",
      "urlVisitedId": "64905290a652f786b1e990b4",
      "date": "Mon Jun 19 2023 13:46:39 GMT+0000 (Coordinated Universal Time)",
      "__v": 0
    }
  ],
  "urlDetail": {
    "_id": "64905290a652f786b1e990b4",
    "urlId": "OY1ua_-g5",
    "origUrl": "https://baidu.com/",
    "shortUrl": "https://brief-lher.onrender.com/OY1ua_-g5",
    "clicks": 1,
    "author": "64904d4e221aa2fd4e01acbc",
    "date": "Mon Jun 19 2023 13:05:20 GMT+0000 (Coordinated Universal Time)",
    "__v": 0
  },
  "message": "Success"
}
```

### See url link history

<details>
<summary> :sunglasses: </summary>
This route is only accessible to logged in users, so add the bearer token for authorization.
</details>

To see the url link history created by a user make a `GET` request to `/api/analytics/` For example:

If request is successful, you'll get a response like this:

```json
{
  "status": 200,
  "url": [
    {
      "_id": "64905290a652f786b1e990b4",
      "urlId": "OY1ua_-g5",
      "origUrl": "https://baidu.com/",
      "shortUrl": "https://brief-lher.onrender.com/OY1ua_-g5",
      "clicks": 1,
      "author": "64904d4e221aa2fd4e01acbc",
      "date": "Mon Jun 19 2023 13:05:20 GMT+0000 (Coordinated Universal Time)",
      "__v": 0
    },
    {
      "_id": "649054a9a652f786b1e990b8",
      "urlId": "wiki",
      "origUrl": "https://wikipedia.org/",
      "shortUrl": "https://brief-lher.onrender.com/wiki",
      "customUrl": "wiki",
      "clicks": 1,
      "author": "64904d4e221aa2fd4e01acbc",
      "date": "Mon Jun 19 2023 13:14:17 GMT+0000 (Coordinated Universal Time)",
      "__v": 0
    }
  ],
  "message": "Success"
}
```
