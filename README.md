# fancy-todo

### GET /todos

#### Request Header
    {
        "Content-Type":"application/json"
    }

#### Response 
    [
        {
            "id": 5,
            "title": "Hehe Haha 3",
            "description": "Ini contoh Todo",
            "status": "done",
            "due_date": "2019-01-20T00:00:00.000Z",
            "createdAt": "2020-03-02T06:14:10.089Z",
            "updatedAt": "2020-03-02T06:14:10.089Z"
        },
        {
            "id": 6,
            "title": "Hehe Haha 4",
            "description": "Ini contoh Todo",
            "status": "done",
            "due_date": "2019-01-20T00:00:00.000Z",
            "createdAt": "2020-03-02T06:14:14.201Z",
            "updatedAt": "2020-03-02T06:14:14.201Z"
        }
    ]

### GET /todos/:id

#### Request Header
    {
        "Content-Type":"application/json"
    }
    
#### example : /todos/1
Pastikan id dari todos itu ada
#### Response

    {
        "id": 7,
        "title": "Hehe Haha 4",
        "description": "Ini contoh Todo",
        "status": "done",
        "due_date": "2019-01-20T00:00:00.000Z",
        "createdAt": "2020-03-02T06:16:27.104Z",
        "updatedAt": "2020-03-02T06:16:27.104Z"
    }

### POST /todos

#### Request Header 
    {
        "Content-Type":"application/json"
    }
    
#### Request 
    {
        "title":"Hehe Haha 4",
        "description":"Ini contoh Todo",
        "status":"done",
        "due_date":"2019-01-20"
    }

### Response 
    {
        "id": 10,
        "title": "Hehe Haha 4",
        "description": "Ini contoh Todo",
        "status": "done",
        "due_date": "2019-01-20T00:00:00.000Z",
        "updatedAt": "2020-03-02T06:16:30.453Z",
        "createdAt": "2020-03-02T06:16:30.453Z"
    }

### PUT /todos/:id

#### Request Header 
    {
        "Content-Type":"application/json"
    }

#### example /todos/3 
Pastikan id dari todos itu ada

#### Request
    {
        "title":"Hehe Haha 123",
        "description":"Ini contoh Todo",
        "status":"done",
        "due_date":"2019-01-20"
    }

#### Response
    {
        "data": {
            "id": 7,
            "title": "Hehe Haha 123",
            "description": "Ini contoh Todo",
            "status": "done",
            "due_date": "2019-01-20T00:00:00.000Z",
            "createdAt": "2020-03-02T06:16:27.104Z",
            "updatedAt": "2020-03-02T07:23:03.860Z"
        },
        "status": 200
    }

### DELETE /todos/:id

#### Request Header
    {
        "Content-Type":"application/json"
    }

#### example /todos/:id
Pastikan id dari todos itu ada

#### Response
    {
        "status": 200,
        "message": "Data berhasil dihapus",
        "result": 1
    }