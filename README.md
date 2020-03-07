# fancy-todo

# Third Party

    Google OAUTH

# Server Documentation

### Dependencies

| Package Name  | Version   |
| ------------  | --------  |
| cors          | ^2.8.5    |
| dotenv        | ^8.2.0    |
| express       | 4.17.1    |
| googleapis    | ^39.2.0   |
| jsonwebtoken  | ^8.5.1    |
| pg            | ^7.18.1   |
| sequelize     | ^5.21.3   |
| mailgun-js    | ^5.21.5   |

### Example .env

    PORT=
    DB_USER=
    DB_PASS=
    SECRET=
    API_KEY =

## Default Port
    SERVER = http://localhost:3000
    CLIENT = http://localhost:8080

## Server
    Tools: NodeJS, Express, sequelize, postgresql

### USER
| Url        | Method | Description                            |
| ---------- | ------ | -------------------------------------- |
| /user/register    | POST  | Menambahkan user baru            |
| /user/login       | POST  | Melakukan login dan mendaptkan token  |
| /user/googleLogin | POST  | Melakukan login dengan Google    |

## API
| No | API                                     	| Description |
| --- | -------------------------------------- 	| ----------- |
| 1.  | Mailgun                            | Mengirim email setiap menambahkan todo |

### 1. POST / user / register

_Example Input (Request Body):_
```javascript
{
    "email": "example@expample.com",
    "password": "123"
}
```

_Response (201):_
```javascript
{
    "email": "example@expample.com",
    "password": "123",
    "updatedAt": "2020-03-07 13:47:28.607+07",
    "createdAt": "2020-03-07 13:47:28.607+07"
}
```

_Example Input (Request Body) :_

```javascript
{
    "email": ,
    "password": "123",	
}
```

_Response ERROR (400):_

```javascript
{
	"Validation error: Email is empty"
}
```

### 1. POST / user / login

_Example Input (Request Body):_
```javascript
{
    "email": "example@expample.com",
    "password": "123"
}
```

_Response (201):_
```javascript

    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoiZXhwYW1wbGVAZXhhbXBsZS5jb20iLCJpYXQiOjE1ODM1NjQyODF9.jvh2CegZlsax09Cp_wcSiOed_84BUJTHJuC1IDAiTXs"

```

_Example Input (Request Body) :_

```javascript
{
    "email": "example@expample.com",
    "password": ,	
}
```

_Response ERROR (400):_

```javascript

	"wrong password"

```

### Todo
| Url        | Method | Description                            |
| ---------- | ------ | -------------------------------------- |
| /todos/    | POST  | Menambahkan todo baru            |
| /todos/       | GET  | Menampilkan list todo  |
| /todos/:id | GET  | Menampilkan list todo berdasarkan id    |
| /todos/:id | PUT  | Melakukan edit ke todo    |
| /todos/:id | DELETE  | Menghapus todo dari list    |

### 1. POST / todos

_Example Input (Request Headers):_
```javascript
{
    "token": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8oi0tgA
}
```

_Example Input (Request Body):_
```javascript
{
	"title" : "Ambil laundry",
	"description" : "jaket dan celana",
	"status" : "On going",
	"due_date" : "15-05-2020"
}
```

_Response (201):_
```javascript
{
    "title": "Ambil laundry",
    "description": "jaket dan celana",
    "status": "On going",
    "due_date": "15-05-2020",
    "userId": 1
}

```

_Example Input:_
```javascript
{
	"title" : null,
	"description" : "jaket dan celana",
	"status" : "On going",
	"due_date" : "15-05-2020"
}
```

_Response ERROR (400):_

```javascript

	"Validation error: Title is empty"

```

### 2. GET / todos

_Example Input (Request Headers):_
```javascript
{
    "token": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8oi0tgA
}
```

_Response (200):_
```javascript
{
    "title": "Ambil laundry",
    "description": "jaket dan celana",
    "status": "On going",
    "due_date": "15-05-2020",
    "userId": 1
}

```

_Example Input (Request Headers) :_

```javascript
{
    "token": 	
}
```

_Response ERROR (500):_

```javascript

	"jwt must be provided"

```

### 3. GET / todos /:id

_Example Input (Request Headers):_
```javascript
{
    "token": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8oi0tgA
}
```

_Response (201):_
```javascript
{
    "id": 71,
    "title": "Ambil laundry",
    "description": "jaket dan celana",
    "status": "On going",
    "due_date": "15-05-2020",
    "createdAt": "2020-03-07T07:15:12.149Z",
    "updatedAt": "2020-03-07T07:15:12.149Z",
    "userId": 1
}

```

_Example Input (Request Headers):_

```javascript
{
    "token":  	
}
```

_Response ERROR (404):_

```javascript

	"error not found"

```

### 4. PUT / todos /:id

_Example Input (Request Headers):_
```javascript
{
    "token": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8oi0tgA
}
```

_Example Input (Request Body):_
```javascript
{
	"title" : "Makan malam",
	"description" : "Makan Ikan",
	"status" : "On going",
	"due_date" : "15-05-2020"
}
```

_Response (200):_
```javascript
{
    "title": "Makan malam",
    "description": "Makan Ikan",
    "status": "On going",
    "due_date": "15-05-2020"
}

```

_Response ERROR (404):_

```javascript

	"error not found"

```

### 5. DELETE / todos /:id

_Example Input (Request Headers):_
```javascript
{
    "token": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8oi0tgA
}
```

_Response (200):_
```javascript
{
    "id": 71,
    "title": "Makan malam",
    "description": "Makan Ikan",
    "status": "On going",
    "due_date": "15-05-2020",
    "createdAt": "2020-03-07T07:15:12.149Z",
    "updatedAt": "2020-03-07T07:20:48.109Z",
    "userId": 1
}

```

_Response ERROR (404):_

```javascript

	"error not found"

```