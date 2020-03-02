# fancy-todo

POST /todos
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
-- request header: 
{
    "Content-Type": "application/json"
}
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
-- request header: 
{
    "Content-Type": "application/json"
}
-- request body:
{
    "id": req.params.id
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

PUT /todos/:id
-- request header: 
{
    "Content-Type": "application/json"
}
-- request body:
id as req.params,
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
-- request header: 
{
    "Content-Type": "application/json"
}
-- request body:
{
    "id": req.params.id
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