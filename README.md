# GET /todos
## Endpoint
> localhost:3000/todos

## Authentication:
Token (required)

## Request header: 
```
Content-Type: "application/json"
token: YOUR_TOKEN
```
## Response:
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
Status 401
```
{
   error message
}
```
Status 403
```
{
   error message
}
```
Status 500
```
{
   msg: "Internal Server Error"
}
```
# POST /todos
## Endpoint
> localhost:3000/todos

## Authentication:
Token (required)

## Request header: 
```
Content-Type: "application/json"
token: YOUR_TOKEN 
```

## Request body:
```
{
    title: string,
    description: string,
    status: string,
    due_date: string
}
```
**status** option is **incomplete** or **complete** 
## Response
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
Status 400
```
[
   error message
]
```
Status 401
```
{
   error message
}
```
Status 403
```
{
   error message
}
```
Status 500
```
{
   msg: "Internal Server Error"
}
```
# GET /todos/:id
## Endpoint
> localhost:3000/todos/:id

## Authentication:
Token (required)

## Request header: 
```
Content-Type: "application/json"
token: YOUR_TOKEN
```
## Response:
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
Status 401
```
{
   error message
}
```
Status 403
```
{
   error message
}
```
Status 404
```
{
   msg: "Error Not Found"
}
```
Status 500
```
{
   msg: "Internal Server Error"
}
```


# PUT /todos/:id
## Endpoint
> localhost:3000/todos/:id

## Authentication:
Token (required)

## Request header: 
```
Content-Type: "application/json"
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
## Response:
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
Status 400
```
[
   error message
]
```
Status 401
```
{
   error message
}
```
Status 403
```
{
   error message
}
```
Status 404
```
{
   msg: "Error Not Found"
}
```
Status 500
```
{
   msg: "Internal Server Error"
}
```


# DELETE /todos/:id
## Endpoint
>localhost:3000/todos/:id
## Authentication:
Token (required)

## Request header: 
```
Content-Type: "application/json"
token: YOUR_TOKEN
```
## Response:
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
Status 401
```
{
   error message
}
```
Status 403
```
{
   error message
}
```
Status 404
```
{
   msg: "Error Not Found"
}
```
Status 500
```
{
   msg: "Internal Server Error"
}
```


# POST /users/register
## Endpoint
> localhost:3000/user/register

## Request header: 
```
Content-Type: "application/json"
```

## Request body:
```
{
    fullname: string,
    username: string,
    email: string,
    password: string
}
```
All req.body is **required**

## Response
Status 201
```
{
     "Message": "User Has Been Created."
}
```
Status 400
```
[
   error message
]
```
Status 500
```
{
   msg: "Internal Server Error"
}
```


# POST /users/login
## Endpoint
> localhost:3000/users/login

## Request header: 
```
Content-Type: "application/json"
```

## Request body:
```
{
    username: string,
    password: string
}
```
All req.body is **required**

## Response
Status 200
```
{
   token: "YOUR TOKEN",
   fullname: "YOUR NAME"
}
```
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