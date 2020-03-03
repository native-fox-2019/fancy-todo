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
title: string,
description: string,
status: boolean,
due_date: string
```
Default value for **status** is false
## Response
```
id: 1,
title: "Learn API",
description: "Explore how to make API documentation",
status: false,
due_date: "2020-01-02",
createdAt: 2020-03-03T15:01:27.405Z,
updatedAt: 2020-03-03T15:01:27.405Z
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