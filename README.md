# fancy-todo

ROUTES:
------------------------------------------------------------------------------------------------------

GET     /todos      --> get all the todo-list
#RESPONSE
[
    {
        "id": 1,
        "title": "Learning API",
        "description": "New subject",
        "status": false,
        "due_date": "02-03-2020",
        "createdAt": "2020-03-02T07:41:27.420Z",
        "updatedAt": "2020-03-02T07:50:22.817Z"
    }
]

------------------------------------------------------------------------------------------------------

POST    /todos      --> adding new todo to the todo-list
#REQ.BODY
{
    title: "Learning session on API",
    description: "learning new topic",
    status: false,
    due_date: "02-03-2021"
}

#VALIDATION
title, description, and due_date cannot be empty / null

#RESPONSE
{
    "title": "Learning session on API",
    "description": "learning new topic",
    "status": false,
    "due_date": "02-03-2021"
}


------------------------------------------------------------------------------------------------------

GET     /todos/:id  --> get the todo ID based on specific id

#REQ.PARAMS
ID got from req.params.id

#VALIDATION
will return 'error not found' if the edited ID is not found

#RESPONSE

{
    "id": 1,
    "title": "Learning API",
    "description": "New subject",
    "status": false,
    "due_date": "02-03-2020",
    "createdAt": "2020-03-02T07:41:27.420Z",
    "updatedAt": "2020-03-02T07:50:22.817Z"
}

------------------------------------------------------------------------------------------------------

DELETE  /todos/:id  --> delete specific todo-list based on the id

#REQ.PARAMS
ID got from req.params.id

#VALIDATIONS
will return 'error not found (id not found)' if the specific ID that need to be deleted not found

#RESPONSE

{
    "id": 1,
    "title": "Learning API",
    "description": "New subject",
    "status": false,
    "due_date": "02-03-2020",
    "createdAt": "2020-03-02T07:41:27.420Z",
    "updatedAt": "2020-03-02T07:50:22.817Z"
}