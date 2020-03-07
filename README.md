# Todo App
### by Darindra R

# GET /todos
### Get All Todo List
## Endpoint
> localhost:3000/todos

## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN
```
## Success Response :
Status 200
```
[
    {
        "id": 1,
        "title": "Belajar Node JS",
        "description": "Mempelajari Node JS",
        "status": "incomplete",
        "due_date": "29/04/2020",
        "createdAt": "2020-03-07T04:33:46.640Z",
        "updatedAt": "2020-03-07T04:33:46.640Z",
    }
]
```
## Error Response :
Status 401
```
{
    "name": "JsonWebTokenError",
    "message": "invalid token"
}
```
Status 403
```
{
    "name": "JsonWebTokenError",
    "message": "jwt must be provided"
}
```
Status 500
```
{
   msg: "Internal Server Error"
}
```
# POST /todos
### Create A Todo List
## Endpoint
> localhost:3000/todos
>


## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN 
```

## Request body:
```
{
    title: String
    description: String,
    status: String,
    due_date: String
}
```
#### All Request Body is **REQUIRED**
#### **Status** option is **incomplete** or **complete** 
## Success Response :
Status 201
```
{
    "Message": "Todo Has Been Created.",
    "Data": {
        "title": "Belajar Node JS",
        "description": "Mempelajari Node JS",
        "status": "incomplete",
        "due_date": "29/04/2020"
   }
}
```
## Error Response :
Status 400
```
[
   {
      "message": "Input Cannot Be Empty",
      "type": "Validation error",
    }
]
```
Status 401
```
{
    "name": "JsonWebTokenError",
    "message": "invalid token"
}
```
Status 403
```
{
    "name": "JsonWebTokenError",
    "message": "jwt must be provided"
}
```
Status 500
```
{
   msg: "Internal Server Error"
}
```
# GET /todos/:id
### Get Todos By ID
## Endpoint
> localhost:3000/todos/:id

## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN
```
## Success Response :
Status 200
```
{
   "id": 1,
    "title": "Belajar Node JS",
    "description": "Mempelajari Node JS",
    "status": "incomplete",
    "due_date": "29/04/2020",
    "createdAt": "2020-03-07T04:33:46.640Z",
    "updatedAt": "2020-03-07T04:33:46.640Z",
}
```
## Error Response :
Status 401
```
{
    "name": "JsonWebTokenError",
    "message": "invalid token"
}
```
Status 403
```
{
    "name": "JsonWebTokenError",
    "message": "jwt must be provided"
}
```
Status 404
```
{
   msg: "Data Not Found"
}
```
Status 500
```
{
   msg: "Internal Server Error"
}
```


# PUT /todos/:id
### Update Todos By ID
## Endpoint
> localhost:3000/todos/:id

## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN
```
## Request body:
```
{
    title": string,
    description": string,
    status": string,
    due_date": string
}
```
#### All Request Body is **REQUIRED**
## Success Response :
Status 200
```
{
    "Message": "Data Has Been Updated",
    "Data": {
        "title": "Belajar Node JS",
        "description": "Mempelajari Node JS",
        "status": "complete",
        "due_date": "29/04/2020"
    }
}
```
## Error Response :
Status 400
```
[
   {
      "message": "Input Cannot Be Empty",
      "type": "Validation error",
    }
]
```
Status 401
```
{
    "name": "JsonWebTokenError",
    "message": "invalid token"
}
```
Status 403
```
{
    "name": "JsonWebTokenError",
    "message": "jwt must be provided"
}
```
Status 404
```
{
   msg: "Data Not Found"
}
```
Status 500
```
{
   msg: "Internal Server Error"
}
```


# DELETE /todos/:id
### Delete Todos From Todo List
## Endpoint
>localhost:3000/todos/:id
## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN
```
## Succes Response :
Status 200
```
{
    "Message": "Data Has Been Deleted",
    "Data": {
        "id": 1,
        "title": "Belajar Node JS",
        "description": "Mempelajari Node JS",
        "status": "complete",
        "due_date": "29/04/2020",
        "createdAt": "2020-03-07T04:33:46.640Z",
        "updatedAt": "2020-03-07T04:37:36.022Z"
    }
}
```
## Error Response :
Status 401
```
{
    "name": "JsonWebTokenError",
    "message": "invalid token"
}
```
Status 403
```
{
    "name": "JsonWebTokenError",
    "message": "jwt must be provided"
}
```
Status 404
```
{
   msg: "Data Not Found"
}
```
Status 500
```
{
   msg: "Internal Server Error"
}
```


# POST /users/register
### Register User
## Endpoint
> localhost:3000/user/register

## Request body:
```
{
    fullname: string,
    username: string,
    email: string,
    password: string
}
```
All Request Body is **REQUIRED**

## Success Response :
Status 201
```
{
     "Message": "User Has Been Created."
}
```
## Error Response :
Status 400
```
[
   {
      "message": "Input Cannot Be Empty",
      "type": "Validation error",
    }
]
```
Status 500
```
{
   msg: "Internal Server Error"
}
```


# POST /users/login
### Login User
## Endpoint
> localhost:3000/users/login
## Request body:
```
{
    username: string,
    password: string
}
```
All Request Body is **REQUIRED**

## Success Response
Status 200
```
{
   token: "YOUR TOKEN",
   fullname: "YOUR NAME"
}
```
## Error Response
Status 400
```
{
     "message": "Bad Request"
}
```
Status 500
```
{
   msg: "Internal Server Error"
}
