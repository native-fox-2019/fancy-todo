# MixList

# Third Party

    Google OAUTH

# Server Documentation    

### Dependencies

| Package Name | Version |
| ------------ | ------- |
| bcrypt     | ^2.4.3  |
| cors         | ^2.8.5  |
| dotenv       | ^8.2.0  |
| express      | 4.17.1  |
| googleapis   | ^39.2.0 |
| jsonwebtoken | ^8.5.1  |
| pg           | ^7.18.1 |
| sequelize    | ^5.21.3 |
| @sendgrid/mail    | ^6.5.1 |

### Devpendencies

| Package Name | Version |
| ------------ | ------- |
| dotenv     | ^8.2.0  |

### Example .env

secret=cialobaobao
SENDGRID_API_KEY='SG.yW5JelmwQYCo6Dg6znEtCQ ZVmHemhvg0dKz22wvkJ2I6Xt9MoY5bPB6F-2WpVmzQw'
PORT=3000

### Default Port

    SERVER = http://localhost:3000
    CLIENT = http://localhost:8080

## Server

    Tools: NodeJS, Express, sequelize, postgresql

## Table Responses

| Code | Description                                     |
| ---- | ----------------------------------------------- |
| 200  | Response Sukses                                 |
| 201  | Data berhasil ditambahkan                       |
| 400  | Request yang diberikan tidak lengkap atau salah |
| 403  | Tidak memiliki otoritas                         |
| 404  | Data tidak ditemukan / tidak ada                |
| 500  | Error dari sisi server / tidak diduga-duga :v   |


### USERS

| Url        | Method | Description                            |
| ---------- | ------ | -------------------------------------- |
| /users/register     | POST   | Menambahkan User baru                      |
| /users     | GET   | Mencari atau Melihat daftar Semua User                      |
| /users/login     | POST   | Mendapatkan token dan mengirim token ke client                      |

## API 

| No | API                                     	| Description |
| --- | -------------------------------------- 	| ----------- |
| 1.  | SendGrid                       		| Untuk Mengirim Pemberitahuan bahwa email anda telah terdaftar|

### 1. POST / Users / register

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
    "username": "marcel",
    "email": "marcel123@gmail.com",
    "password": "123",	
}
```

_Response (201, Data berhasil ditambahkan):_

```javascript
{
    "username": "marcel",
    "email": "marcel123@gmail.com",
    "password": "1aojadoa2sdasd4adplalaxlasclsml",	
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
}
```


_Example Input (Request Body) :_

```javascript
{
    "username": "marcel",
    "email": "marcel123@gmail.com",
    "password": "",	
}
```

_Response ERROR (400, Request tidak lengkap):_

```javascript
{
	status: 400,
	msg: "Bad Request"
}
```
### 2. POST / users / login

<br>


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
    "email": "marcel123@gmail.com",
    "password": "123",	
}
```

_Response (200, Respon Sukses ):_

```javascript
{
    "username": "marcel",
    "email": "marcel123@gmail.com",
    "password": "1aojadoa2sdasd4adplalaxlasclsml",	
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
}
```


_Example Error Input (Request Body) :_

```javascript
{
    "username": "marcel",
    "email": "marcel123@gmail.com",
    "password": "",	
}
```

_Response ERROR(400, Data tidak lengkap):_

```javascript
{
	status: 400,
	msg: "Password cannot empty."
}

```


### 3. GET / users 


_Response (200, Respon Sukses):_

```javascript
[
  {
    "id": 1,
    "username": "marcelus",
    "email": "marcel123456@gmail.com",
    "password": "$2b$10$I2JXLSnEFazR50WQ4EiMPuNsYlOgoQBwJMgqG33Q0IrFEZY8HlrFG",
    "createdAt": "2020-03-05T10:51:42.750Z",
    "updatedAt": "2020-03-05T10:51:42.750Z"
  },
  {
    "id": 2,
    "username": "marcellll",
    "email": "marcel1234555@gmail.com",
    "password": "$2b$10$WVYzEHBXfwd1X75iNUmA6OQMN80nrpXnp1VB7VZR/Gf8zGf3vGWlO",
    "createdAt": "2020-03-05T12:51:42.921Z",
    "updatedAt": "2020-03-05T12:51:42.921Z"
  }
]
```

_If the "data" was empty, the response will be :_

```javascript
"[]";
```

### 4. PUT / users

_Request header:_

```javascript
{
    "Content-Type": "application/json",
}
```

<br>

_Example Input (Request Body) :_

```javascript
{
    "email": "marcel123@gmail.com",
    "password": "123",	
}
```

_Response (200, Respon Sukses):_

```javascript
{
    "username": "marcel",
    "email": "marcel123@gmail.com",
    "password": "1aojadoa2sdasd4adplalaxlasclsml",	
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
}
```


_Example Error Input (Request Body) :_

```javascript
{
    "username": "marcel",
    "email": "marcel123@gmail.com",
    "password": "",	
}
```

_Response ERROR(400, Data tidak lengkap):_

```javascript
{
	status: 400,
	msg: "Password cannot empty."
}

```


## Todos


| Url        | Method | Description                            |
| ---------- | ------ | -------------------------------------- |
| /todos     | POST   | Menambahkan todos baru kedalam todos list                      |
| /todos     | GET   | Mencari atau Melihat todos punya user                     |
| /todos/:id     | GET   | Mencari atau Melihat todos berdasarkan id                  |
| /todos/:id| PUT  | Mengedit Data todos         |
| /todos/:id | DELETE   | Menghapus todos dari table favorite                      |



### 1. POST /todos

_Example Input (Request Body) :_

```javascript
{
"title": "Makan",
"desciption": "Makan bakso di taman solo",
"due_date": "2020-02-03T13:03:50.806Z"
}
```

_Response (201, data berhasil ditambahkan):_

```javascript
{
    "id": 1,
    "title": "Makan",
    "desciption": "Makan bakso di taman solo",
    "due_date": "2020-02-03T13:03:50.806Z"
    "status": "Belum",
    "UserId": 1,
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"

}
```

### 2.  GET / todos

_Response (200, response sukses):_

```javascript
[
{
     "id": 1,
    "title": "Makan",
    "desciption": "Makan bakso di taman solo",
    "due_date": "2020-02-03T13:03:50.806Z"
    "status": "Belum",
    "UserId": 1,
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
},
{
     "id": 2,
    "title": "Nyuci",
    "desciption": "Nyuci handuk",
    "due_date": "2020-02-03T13:03:50.806Z"
    "status": "Belum",
    "UserId": 1,
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
}
]
```


### 3.  PUT / todos /:id


_Example Input (Request Body) :_

```javascript
{
    "title": "Makan",
    "desciption": "Makan bakso di taman solo",
    "due_date": "2020-02-03T13:03:50.806Z"
}
```
_Response (200, response sukses):_

```javascript
{
   {
     "id": 1,
    "title": "Makan",
    "desciption": "Makan bakso di taman solo",
    "due_date": "2020-02-03T13:03:50.806Z"
    "status": "Belum",
    "UserId": 1,
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
}
}

```

_If the ID wasn't found the respond will be (404, data not found):_

```javascript
{
  status: 404,
  msg: "data not found"
}
```

_Example Input (Request Body) :_

```javascript
{
"title": "Summer Paradise",
"artist": ""
}

```
_Response ERROR (400, data tidak lengkap):_

```javascript
{
  "status": 400,
  "msg": "Artist cannot be empty."
}

```

### 4.  DELETE / todos /:id



_Example Input (Request Params) :_

```javascript

 req.params.id = 2

```

	
_Response (200, response if success):_

```javascript
{
     "id": 2,
    "title": "Makan",
    "desciption": "Makan bakso di taman solo",
    "due_date": "2020-02-03T13:03:50.806Z"
    "status": "Belum",
    "UserId": 1,
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
}
```


_Example Error Input (Request Body) :_

```javascript
req.params.id = 2
```


_Response ERROR (404, data not found):_

```javascript
{
  status: 404
  msg: 'error not found'
}

```

### 5.  GET / todos /:id



_Example Input (Request Params) :_

```javascript

 req.params.id = 2

```

	
_Response (200, response if success):_

```javascript
{
     "id": 2,
    "title": "Makan",
    "desciption": "Makan bakso di taman solo",
    "due_date": "2020-02-03T13:03:50.806Z"
    "status": "Belum",
    "UserId": 1,
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
}
```


_Example Error Input (Request Body) :_

```javascript
req.params.id = 2
```


_Response ERROR (404, data not found):_

```javascript
{
  status: 404
  msg: 'error not found'
}

```
