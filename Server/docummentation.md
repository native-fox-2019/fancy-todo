# GET /todos

Request Header

{
    "Content-Type":"application/json"
}
Response

[
    {
        "id": 1,
        "title": "Testing",
        "description": "testing dicoba",
        "status": "false",
        "due_date": "2020-02-02T00:00:00.000Z",
        "createdAt": "2020-03-03T06:14:11.089Z",
        "updatedAt": "2020-03-03T06:14:11.089Z"
    },
    {
        "id": 2,
        "title": "Testing2",
        "description": "TodoTesting",
        "status": "false",
        "due_date": "2020-02-02T00:00:00.000Z",
        "createdAt": "2020-03-03T06:15:15.201Z",
        "updatedAt": "2020-03-03T06:15:15.201Z"
    }
]

#GET /todos/:id

Request Header

{
    "Content-Type":"application/json"
}
example : /todos/1

Pastikan id dari todos itu ada

Response

{
        "id": 1,
        "title": "Testing",
        "description": "testing dicoba",
        "status": "false",
        "due_date": "2020-02-02T00:00:00.000Z",
        "createdAt": "2020-03-03T06:14:11.089Z",
        "updatedAt": "2020-03-03T06:14:11.089Z"
}

#POST /todos

Request Header

{
    "Content-Type":"application/json"
}
Request

{
    "title":"tester",
    "description":"TodoTesting",
    "status":"false",
    "due_date":"2020-02-02"
}
Response

{
    "id": 3,
    "title":"tester",
    "description":"TodoTesting",
    "status":"false",
    "due_date":"2020-02-02"T00:00:00.000Z",
    "updatedAt": "2020-03-02T06:16:30.453Z",
    "createdAt": "2020-03-02T06:16:30.453Z"
}

PUT /todos/:id

Request Header

{
    "Content-Type":"application/json"
}
example /todos/3

Pastikan id dari todos itu ada

Request

{
    "title":"testeredit",
    "description":"TodoTesting",
    "status":"false",
    "due_date":"2020-02-02"
}
Response

{
    "data": {
        "id":3
        "title":"testeredit",
        "description":"TodoTesting",
        "status":"false",
        "due_date":"2020-02-02"T00:00:00.000Z",
        "createdAt": "2020-03-02T06:16:27.104Z",
        "updatedAt": "2020-03-02T07:23:03.860Z"
    },
    "status": 200
}

DELETE /todos/:id

Request Header

{
    "Content-Type":"application/json"
}
example /todos/3

Pastikan id dari todos itu ada

Response

{
    "status": 200,
    "result": "data": {
        "id":3
        "title":"testeredit",
        "description":"TodoTesting",
        "status":"false",
        "due_date":"2020-02-02"T00:00:00.000Z",
        "createdAt": "2020-03-02T06:16:27.104Z",
        "updatedAt": "2020-03-02T07:23:03.860Z"
    }
}