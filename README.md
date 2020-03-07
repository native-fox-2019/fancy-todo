# fancy-to-do
Fancy To-Do List API, Documentation


# FANCY TO-DO LIST API
Fancy To-Do List API

### Preparing you must have an accout to access todo

### 0.1 POST /register
_Request header:_

```javascript
{
    "Content-Type": "application/json"
}
```

<br>

_Example Input (Request Body) :_

```javascript
{
    "email": "test@mail.com",
    "password": "test"
}
```

_Response :_

```javascript
{
    "id": 22,
    "email": "test@mail.com",
    "password": ###Hashed Password
}
```

### 0.2 POST /login
_Request header:_

```javascript
{
    "Content-Type": "application/json"
}
```

<br>

_Example Input (Request Body) :_

```javascript
{
    "email": "test@mail.com",
    "password": "test"
}
```

_Response :_

```javascript
{
    "usertoken": ###token from server here
}
```

### 1. POST /todos
_Request header:_

```javascript
{
    "Content-Type": "application/json"
    "usertoken": ###token from server here
}
```

<br>

_Example Input (Request Body) :_

```javascript
{
    "title": "belajar",
    "description": "belajar node js",
    "status": "incomplete",
    "due_date": "2020-12-12T00:00:00.000Z"
}
```

_Response :_

```javascript
{
    "id": 1,
    "title": "belajar",
    "description": "belajar",
    "status": "incomplete",
    "due_date": "2020-12-12T00:00:00.000Z",
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
}
```

### 2. GET /todos

_Request header:_

```javascript
{
    "Content-Type": "application/json"
    "usertoken": ###token from server here
}
```
<br>

_Response :_

```javascript
[
    {
        "id": 1,
        "title": "belajar",
        "description": "belajar node js",
        "status": "incomplete",
        "due_date": "2020-12-12T00:00:00.000Z",
        "updatedAt": "2020-02-03T13:03:50.806Z",
        "createdAt": "2020-02-03T13:03:50.806Z"
    },
    {
        "id": 2,
        "title": "baca dukemntasi",
        "description": "baca dokumentasi sequelize ",
        "status": "incomplete",
        "due_date": "2020-12-12T00:00:00.000Z",
        "updatedAt": "2020-02-03T13:03:50.806Z",
        "createdAt": "2020-02-03T13:03:50.806Z"
    }
]

```

### 3. GET /todos/:id
_Request header:_

```javascript
{
    "Content-Type": "application/json"
    "usertoken": ###token from server here
}
```

<br>

_Example Input (Request Params) :_

```javascript
localhost:3000/todos/1
```

_Response :_

```javascript
{
    "id": 1,
    "title": "belajar",
    "description": "belajar node js",
    "status": "incomplete",
    "due_date": "2020-12-12T00:00:00.000Z",
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
}
```

_If the "id" wasn't found, the response will be :_

```javascript
"Todo Not found"
```

### 4. PUT /todos/:id
_Request header:_

```javascript
{
    "Content-Type": "application/json"
    "usertoken": ###token from server here
}
```

<br>

_Example Input (Request Params) :_

```javascript
localhost:3000/todos/1
```

_Example Input (Request Body) :_

```javascript
{
    "title": "belajar lagi",
    "description": "belajar baca dokumntasi sequelize",
    "status": "complete",
    "due_date": "2020-12-12T00:00:00.000Z"
}
```

_Response :_

```javascript
{
    "id": 1,
    "title": "belajar lagi",
    "description": "belajar baca dokumntasi sequelize",
    "status": "complete",
    "due_date": "2020-12-12T00:00:00.000Z",
    "updatedAt": "2020-02-03T13:03:58.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
}
```

### 5. DELETE /todos/:id
_Request header:_

```javascript
{
    "Content-Type": "application/json"
    "usertoken": ###token from server here
}
```

<br>

_Example Input (Request Params) :_

```javascript
localhost:3000/todos/1
```

_Response :_

```javascript
{
    message: "Has been delete"
}
```
# Third Party
    Google OAUTH
    password.markei.nl (Generate recommendation strong password, combination aplhabet, and)

# Server Documentation

## Server

    Tools: NodeJS, Express, sequelize, postgresql

### Dependencies 
|   Package Name    |   Version     |
| ---------------   | ------------  |
|  bcryptjs         | ^4.0.1        |
|  cors             | ^2.8.5        |
|  dotenv           | ^8.2.0        |
|  express          | ^4.17.1       |
|  google-auth      | ^5.10.1       |
|  jsonwebtoken     | ^8.5.1        |
|  pg               | ^7.18.1       |
|  sequelize        | ^5.21.3       |

### Example .env

    PORT=3000
    SECRET="secret"



### Default Port

    3000

# API Documentation

## Todos

| Url   | Method    |   Description |
| -------------     | ------------- | ------------- |
| /     | POST      | Membuat todo baru
| /     | GET       | Mendapatkan list todo
| /:id  | GET       | Mendapatkan data todo berdasarkan id
| /:id  | PUT       | Mengubah data todo berdasarkan id
| /:id  | DELETE    | Menghapus data todo berdasarkan id


## Table Responses

| Code   | Description    | 
| -------------     | ------------- |
| 200     | Response Sukses      | 
| 201     | Data berhasil ditambahkan      | 
| 400     | Request yang diberikan tidak lengkap atau salah      | 
| 403     | Tidak memiliki otoritas      | 
| 404     | Data tidak ditemukan / tidak ada      | 
| 500     | Error dari sisi server    | 
