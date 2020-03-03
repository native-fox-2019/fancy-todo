# fancy-todo

### POST/todos

Request Header :

```bash
{
    "Content-Type" : "application/json"
}
```

Request Body : 

```bash
{
    "title" : "Learning REST API",
    "description" : "Learning REST API at Hacktiv8",
    "status" : "uncompleted",
    "due_date" : "2020-03-07T07:42:19.193Z"
}
```

Response : 

```bash
{
    "id": 1,
    "title": "Learning REST API",
    "description": "Learning REST API at Hacktiv8",
    "status": "uncompleted",
    "due_date": "2020-03-07T07:42:19.193Z",
    "createdAt": "2020-03-02T07:35:34.330Z",
    "updatedAt": "2020-03-02T08:03:49.056Z"
}
```

Request Body (if property is empty) : 

```bash
{
    "title" : "",
    "description" : "",
    "status" : "uncompleted",
    "due_date" : "2020-03-07T07:42:19.193Z"
}
```

Response (error) : 

```bash
{
    "title": {
        "msg": "Please enter the title!"
    },
    "description": {
        "msg": "Please enter the description!"
    }
}
```


