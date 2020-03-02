# fancy-todo

Request Header:
{
    "Content-Type":"application/json"
}

 [POST / Create new Todos ]



request Body : 
{
    "title": "buat gitIgnore",
    "description": "fase 1 gw lupa git ignore di livecode terakhir",
    "status": "uncompleted",
    "due_date": "2020-03-05"
}

Response if succesfully created:
{
    "id": 29,
    "title": "buat gitIgnore",
    "description": "fase 1 gw lupa git ignore di livecode terakhir",
    "status": "uncompleted",
    "due_date": "2020-03-05T00:00:00.000Z",
    "updatedAt": "2020-03-02T08:29:31.580Z",
    "createdAt": "2020-03-02T08:29:31.580Z"
}

Response because of validation error e.g  title:""
{
    "error": [
        "title cannot be an empty space",
        "description cannot be an empty space"
    ]
}


[  GET TODOS / showing all todos ]



Response

[
    {
        "id": 27,
        "title": "TEst 2",
        "description": "description title",
        "status": "uncompleted",
        "due_date": "2020-03-05T00:00:00.000Z",
        "createdAt": "2020-03-02T07:32:38.195Z",
        "updatedAt": "2020-03-02T07:32:38.195Z"
    },
    {
        "id": 14,
        "title": "title update",
        "description": "description update",
        "status": "uncompleted update",
        "due_date": "2020-03-05T00:00:00.000Z",
        "createdAt": "2020-03-02T07:22:43.630Z",
        "updatedAt": "2020-03-02T08:16:26.207Z"
    },
    {
        "id": 28,
        "title": "adalah 1",
        "description": "description update",
        "status": "uncompleted update",
        "due_date": "2020-03-05T00:00:00.000Z",
        "createdAt": "2020-03-02T08:26:10.781Z",
        "updatedAt": "2020-03-02T08:26:10.781Z"
    },
    {
        "id": 29,
        "title": "buat gitIgnore",
        "description": "fase 1 gw lupa git ignore di livecode terakhir",
        "status": "uncompleted",
        "due_date": "2020-03-05T00:00:00.000Z",
        "createdAt": "2020-03-02T08:29:31.580Z",
        "updatedAt": "2020-03-02T08:29:31.580Z"
    }
]



 [GET TODOS by ID]





REQUEST BODY :
Http://localhost:3000/todos/23

RESPONSE :
{
    "id": 23,
    "title": null,
    "description": null,
    "status": null,
    "due_date": null,
    "createdAt": "2020-03-02T07:28:39.661Z",
    "updatedAt": "2020-03-02T07:28:39.661Z"
}

RESPONSE IF ERROR
{
    "msg": "data tidak ditemukan"
}



 [ PUT TODOS/ UPDATE TODOS]




REQUEST BODY :
{
    "title": "write a poem",
    "description": "write a beautiul poem about cringy senja",
    "status": "uncompleted",
    "due_date": "2020-03-05"
}

RESPONSE : 
{
    "title": "write a poem",
    "description": "write a beautiul poem about cringy senja",
    "status": "uncompleted",
    "due_date": "2020-03-05"
}

RESPONSE IF ID DOESNT EXISTS
"not found"

RESPONSE IF VIOLATE VALIDATION
{
    "error": [
        "title cannot be an empty space",
        "description cannot be an empty space"
    ]
}



[DELETE TODOS ID // DELETE TODO(S) BY ID]



RESPONSE

[
    {
        "id": 24,
        "title": "TEst 2",
        "description": "description title",
        "status": "uncompleted",
        "due_date": "2020-03-05T00:00:00.000Z",
        "createdAt": "2020-03-02T07:30:14.382Z",
        "updatedAt": "2020-03-02T07:30:14.382Z"
    },
    "data telah dihapus"
]