# fancy-todo
### by Henarivan Andhika Abhirama

#### Postman Documentation
For a more precise request of a certain status, check link below
Link to postman documentations: https://documenter.getpostman.com/view/10571131/SzKbKuJS

## GET /todos
Get all todos that the user have

### Properties
- token (String)

#### Request Header
```javascript
{
   "token" : "<your_token>" 
}
```

### Response
Status 200

```javascript
[
  {
    "id": 75,
    "title": "wewafd",
    "description": "wew",
    "status": "Not Started",
    "due_date": "2020-03-08",
    "createdAt": "2020-03-07T04:05:58.726Z",
    "updatedAt": "2020-03-07T04:19:02.101Z",
    "UserId": 6
  },
  {
    "id": 76,
    "title": "Berhasil diedit",
    "description": "Membuat route sesuai REST dan membuat dokumentasi",
    "status": "Not Started",
    "due_date": "2020-03-04",
    "createdAt": "2020-03-07T04:10:58.064Z",
    "updatedAt": "2020-03-07T04:44:03.927Z",
    "UserId": 6
  },
  {
    "id": 77,
    "title": "Belajar gituan",
    "description": "gituan apa si",
    "status": "Not Started",
    "due_date": "2020-03-08",
    "createdAt": "2020-03-07T04:36:08.958Z",
    "updatedAt": "2020-03-07T04:36:08.958Z",
    "UserId": 6
  }
]
```
<br>

## POST /todos
Create a todo

### Properties
- Title (String)
    - Can not be null or empty
- Description (String)
    - Can not be null or empty
- Due Date (String)
    - Can not be null or empty
    - YYYY/MM/DD format
- Status (String)

> User do not input a status as the status was set on default to 'Not Started'

#### Request Header
```javascript
{
   "Content-Type": "application/json",
   "token" : "<your_token>" 
}
```

#### Response
Status 201
```javascript
{
  "msg": "New Todo has been created",
  "newTodo": {
    "title": "Belajar gituan",
    "description": "gituan apa si",
    "due_date": "2020-03-08",
    "UserId": 6
  }
}
```

Status 400
```javascript
{
  "status": 400,
  "msg": [
    "Validation errors (title can not be empty)"
  ]
}
```
<br>

## GET /todos/:id

<br>

## PUT /todos/:id
Update a todo by the id from the todos resources

### Properties
- id (Number)
    - Gotten from the client
- Title (String)
    - Can not be null or empty
- Description (String)
    - Can not be null or empty
- Due Date (String)
    - Can not be null or empty
    - YYYY/MM/DD format
- Status (String)

#### Request Headers
```javascript
{
    "Content-Type": "application/json",
    "token" : "<your_token>"
}
```

#### Request Body
```javascript
{
	"title" : "Berhasil diedit",
	"description" : "Membuat route sesuai REST dan membuat dokumentasi",
	"due_date" : "2020-03-04"
}
```

#### Response
Status (200)
```javascript
{
  "msg": "Todo has been edited",
  "editedTodo": {
    "title": "Berhasil diedit",
    "description": "Membuat route sesuai REST dan membuat dokumentasi",
    "due_date": "2020-03-04"
  }
}
```

Status (400)
```javascript
{
  "status": 400,
  "msg": [
    "Validation errors (title can not be empty)",
    "Validation errors (description can not be empty)",
    "Validation errors (due_date can not be empty)"
  ]
}
```

Status (403)
```javascript
{
  "status": 403,
  "msg": "You are not authorized"
}
```

Status (404)
```javascript
{
  "status": 404,
  "msg": "Todo not found"
}
```
<br>

## DELETE /todos/:id
Delete a todo

### Properties
- id (Number)
    - Gotten from the client

#### Request Headers
```javascript
{
    "Content-Type": "application/json",
    "token" : "<your_token>"
}
```

#### Response
Status (200)
```javascript
{
  "id": 75,
  "title": "wewafd",
  "description": "wew",
  "status": "Not Started",
  "due_date": "2020-03-08",
  "createdAt": "2020-03-07T04:05:58.726Z",
  "updatedAt": "2020-03-07T04:19:02.101Z",
  "UserId": 6
}
```

Status (403)
```javascript
{
  "status": 403,
  "msg": "You are not authorized"
}
```

Status (404)
```javascript
{
  "status": 404,
  "msg": "Todo not found"
}
```
<br>

## POST /register
Sign up an account

### Properties
- first_name (String)
    - Can not be null or empty
- last_name (String)
    - Can not be null or empty
- email (String)
    - Can not be null or empty
- password (String)
    - Can not be null or empty

#### Request Headers
```javascript
{
    "Content-Type": "application/json"
}
```

#### Request Body
```javascript
{
	"first_name" : "Puji",
	"last_name" : "Yanto",
	"email" : "puji@gmail.com",
	"password" : "qeqeqe"
}
```

#### Response
Status (201)
```javascript
{
  "id": 16,
  "first_name": "Puji",
  "last_name": "Yanto",
  "email": "puji@gmail.com",
  "password": "qeqeqe",
  "updatedAt": "2020-03-07T05:14:26.233Z",
  "createdAt": "2020-03-07T05:14:26.233Z"
}
```
Status (400)
```javascript
{
  "status": 400,
  "msg": [
    "Validation errors (First Name can not be empty)",
    "Validation errors (Last name can not be empty)",
    "Validation errors (Email can not be empty)",
    "Validation errors (Password can not be empty)"
  ]
}
```
<br>

## POST /login
Login to an account
Generates a token for authentication

### Properties
- email (String)
- password (String)

#### Request Headers
```javascript
{
    "Content-Type": "application/json"
}
```
#### Request Body
```javascript
{
	"email" : "akbar@gmail.com",
	"password" : "qwerty"
}
```

#### Response
Status (200)
```javascript
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJha2JhckBnbWFpbC5jb20iLCJpYXQiOjE1ODM1NTM1OTN9.pV44TwKKmaEKIwXgs5-JTLosad7HSji8gIvtWN4Acvs"
```

Status (400)
```javascript
{
  "status": 400,
  "msg": "Wrong Email / Password"
}
```
<br>

## POST /googleLogin
Login to an account with a google acount

### Properties
- Google Token (String)
    - Gotten from google sign-in server

#### Request Headers
```javascript
{
    "Content-Type": "application/json"
}
```

#### Request Body
```javascript
{
	"token" : "<token_from_google>"
}
```

#### Response
Status (200)
```javascript
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJoZW5hcml2YW5hYUBnbWFpbC5jb20iLCJpYXQiOjE1ODM1NTk5MjF9.q0qRNCzGxjC1TeqsaHxwqINnLu2FXRjTD3IulTJlzE8"
```

### Properties