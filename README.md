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
    status: boolean,
    due_date: string
}
```
Default value for **status** is false
## Response
Status 201
```
{
    id: 1,
    title: "Learn API",
    description: "Explore how to make API documentation",
    status: false,
    due_date: "2020-01-02",
    UserId: 1,
    createdAt: 2020-03-03T15:01:27.405Z,
    updatedAt: 2020-03-03T15:01:27.405Z
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
        id: 1,
        title: "Learn API",
        description: "Explore how to make API documentation",
        status: false,
        due_date: "2020-01-02",
        createdAt: 2020-03-03T15:01:27.405Z,
        updatedAt: 2020-03-03T15:01:27.405Z
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
    id: 1,
    title: "Learn API",
    description: "Explore how to make API documentation",
    status: true,
    due_date: "2020-01-02",
    createdAt: 2020-03-03T15:01:27.405Z,
    updatedAt: 2020-03-03T15:01:27.405Z
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
    status": boolean,
    due_date": string
}
```
## Response:
Status 200
```
{
    id": 1,
    title: "Learn API",
    description: "Explore how to make API documentation",
    status: true,
    due_date: "2020-01-02",
    createdAt: 2020-03-03T15:01:27.405Z,
    updatedAt: 2020-03-03T15:01:27.405Z
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
    id: 1,
    title: "Learn API",
    description: "Explore how to make API documentation",
    status: false,
    due_date: "2020-01-02",
    createdAt: 2020-03-03T15:01:27.405Z,
    updatedAt: 2020-03-03T15:01:27.405Z
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
> localhost:3000/users/register

## Request header: 
```
Content-Type: "application/json"
```

## Request body:
```
{
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
    id: 1,
    username: "Username example",
    email: "test@mail.com",
    password: "hashedPassword",
    createdAt: 2020-03-03T15:01:27.405Z,
    updatedAt: 2020-03-03T15:01:27.405Z
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
    email: string,
    password: string
}
```
All req.body is **required**

## Response
Status 200
```
{
   token: "YOUR_TOKEN"
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