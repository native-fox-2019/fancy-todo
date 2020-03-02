# fancy-todo

Request Header:
{
    "Content-Type":"application/json"
}

===================== [POST / Create new Todos ] ===========================
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

Response because of validation error e.g 



