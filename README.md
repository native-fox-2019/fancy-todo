# fancy-todo

POST /todos
url: localhost:3000/todos
-- request header: 
{
    "Content-Type": "application/json"
}
-- request body:
{
    "title": "Learn API",
    "description": "Explore how to make API documentation",
    "status": true || false,
    "due_date": "2020-01-02"
}
-- response:
{
    "id": 1,
    "title": "Learn API",
    "description": "Explore how to make API documentation",
    "status": true || false,
    "due_date": "2020-01-02",
    createdAt: now,
    updatedAt: now
}

GET /todos
url: localhost:3000/todos
-- request header: 

-- request body:

-- response:
[
    {
        "id": 1,
        "title": "Learn API",
        "description": "Explore how to make API documentation",
        "status": true || false,
        "due_date": "2020-01-02",
        createdAt: now,
        updatedAt: now
    }
]

GET /todos/:id
url: localhost:3000/todos/:id
-- request header: 

-- request body:

-- response:
{
    "id": 1,
    "title": "Learn API",
    "description": "Explore how to make API documentation",
    "status": true || false,
    "due_date": "2020-01-02",
    createdAt: now,
    updatedAt: now
}

PUT /todos/:id
url: localhost:3000/todos/:id
-- request header: 
{
    "Content-Type": "application/json"
}
-- request body:
{
    "title": "Learn API",
    "description": "Explore how to make API documentation",
    "status": true || false,
    "due_date": "2020-01-02"
}
-- response:
{
    "id": 1,
    "title": "Learn API",
    "description": "Explore how to make API documentation",
    "status": true || false,
    "due_date": "2020-01-02",
    createdAt: now,
    updatedAt: now
}

DELETE /todos/:id
url: localhost:3000/todos/:id
-- request header: 

-- request body:

-- response:
{
    "id": 1,
    "title": "Learn API",
    "description": "Explore how to make API documentation",
    "status": true || false,
    "due_date": "2020-01-02",
    createdAt: now,
    updatedAt: now
}