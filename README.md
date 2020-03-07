# fancy-todo

link documentation todo controller side: https://documenter.getpostman.com/view/10571018/SzKbKuJY

link documentation calendarific API : https://documenter.getpostman.com/view/10571018/SzRxUpPq

link documentation User controller side : https://documenter.getpostman.com/view/10571018/SzRxUpPr
 
POST /todos ---> Add new Todo List Into Database

Validation : Request Body Cannot be Empty

Request Header :
{
    "Content-Type" : "application/json"
}

Request Body :
{
    "title" : "Makan di h8",
	"description" : "Makan ayam",
	"status" : false,
	"due_date" : "03-03-2020"
}

Response :
{
    "id": 6,
    "title": "Makan di h8",
    "description": "Makan ayam",
    "status": false,
    "due_date": "03-03-2020",
    "updatedAt": "2020-03-02T08:21:31.712Z",
    "createdAt": "2020-03-02T08:21:31.712Z"
}

======================================================================

GET /todos ---> Show All Todo on database

Response :
[
    {
        "id": 4,
        "title": "Pergi dari h8",
        "description": "Awas kalo hujan",
        "status": false,
        "due_date": "03-03-2020",
        "createdAt": "2020-03-02T07:38:09.951Z",
        "updatedAt": "2020-03-02T07:38:09.951Z"
    },
    {
        "id": 6,
        "title": "Makan di h8",
        "description": "Makan ayam",
        "status": false,
        "due_date": "03-03-2020",
        "createdAt": "2020-03-02T08:21:31.712Z",
        "updatedAt": "2020-03-02T08:21:31.712Z"
    }
]

======================================================================

GET /todos/:id ---> Show one todo by todo id

Response : 
{
    "id": 4,
    "title": "Pergi dari h8",
    "description": "Awas kalo hujan",
    "status": false,
    "due_date": "03-03-2020",
    "createdAt": "2020-03-02T07:38:09.951Z",
    "updatedAt": "2020-03-02T07:38:09.951Z"
}

======================================================================

PUT /todos/:id ---> Edit todo by todo id

Validation : Request Body Cannot be Empty

Request Header :
{
    "Content-Type" : "application/json"
}

Request Body :
{
	"title" : "Makan di h8",
	"description" : "Makan bebek",
	"status" : false,
	"due_date" : "03-03-2020"
}

Response :
{
    "title": "Makan di h8",
    "description": "Makan bebek",
    "status": false,
    "due_date": "03-03-2020"
}

======================================================================

DELETE /todos/:id ---> Delete todo from database by todo id

Response :
{
    "id": 6,
    "title": "Makan di h8",
    "description": "Makan bebek",
    "status": false,
    "due_date": "03-03-2020",
    "createdAt": "2020-03-02T08:21:31.712Z",
    "updatedAt": "2020-03-02T08:28:43.107Z"
}