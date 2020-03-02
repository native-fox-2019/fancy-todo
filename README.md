# fancy-todo

postman docs: https://documenter.getpostman.com/view/10571131/SzKbKuJS

POST /todos

Request Header: 
{
    "Content-Type": "application/json",
}

Request Body:
{
	"title" : "Nyari Jodoh",
	"description" : "Belajar Tinder",
	"status" : false,
	"due_date" : "2020-03-17"
}

Response:
    200:
        {
            "msg": "New Todo has been created",
            "newTodo": {
                "title": "Nyari Jodoh",
                "description": "Belajar Tinder",
                "status": false,
                "due_date": "2020-03-17"
            }
        }


GET /todos
Response:
    200:
        [
            {
                "id": 1,
                "title": "Belajar REST API",
                "description": "Bikin routing sesuai REST dan melalui POSTMAN",
                "status": false,
                "due_date": "2020-03-07 00:00:00.000 +00:00",
                "createdAt": "2020-03-02T06:05:02.349Z",
                "updatedAt": "2020-03-02T06:05:02.349Z"
            },
            {
                "id": 4,
                "title": "Belajar buat dokumentasi api",
                "description": "Belum Tau",
                "status": false,
                "due_date": "2020-03-07 00:00:00.000 +00:00",
                "createdAt": "2020-03-02T07:01:24.253Z",
                "updatedAt": "2020-03-02T07:01:24.253Z"
            },
            {
                "id": 2,
                "title": "Belajar Auth",
                "description": "Belajar JWT dan Session",
                "status": false,
                "due_date": "2020-03-09 00:00:00.000 +00:00",
                "createdAt": "2020-03-02T06:06:16.769Z",
                "updatedAt": "2020-03-02T07:05:08.221Z"
            }
        ]

GET /todos/:id
Response:
    200:
        {
            "id": 2,
            "title": "Belajar REST API",
            "description": "Bikin routing sesuai REST dan melalui POSTMAN",
            "status": false,
            "due_date": "2020-03-07 00:00:00.000 +00:00",
            "createdAt": "2020-03-02T06:06:16.769Z",
            "updatedAt": "2020-03-02T06:06:16.769Z"
        }

PUT /todos/:id
Request Header: 
{
    "Content-Type": "application/json",
}

Request Body:
{
	"title" : "Belajar Auth",
	"description" : "Belajar JWT dan Session",
	"status" : false,
	"due_date" : "2020-03-09"
}

Response:
    200:
        {
            "msg": "Todo has been edited",
            "editedTodo": {
                "title": "Belajar Auth",
                "description": "Belajar JWT dan Session",
                "status": false,
                "due_date": "2020-03-09"
            }
        }

DELETE /todos/:id
Response:
    200:
        {
            "id": 5,
            "title": "Nyari Jodoh",
            "description": "Belajar Tinder",
            "status": false,
            "due_date": "2020-03-17",
            "createdAt": "2020-03-02T07:17:59.369Z",
            "updatedAt": "2020-03-02T07:17:59.369Z"
        }

