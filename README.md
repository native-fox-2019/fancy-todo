# fancy-todo documentation
_______________________________________________________________________

title       => the title of a todo task, cannot be null or empty string
description => the description of a todo task
status      => represents the complete or uncomplete status of a todo task, the value by default: false
due_date    => due date of a todo task, follow YYYY-MM-DD format
_______________________________________________________________________

POST /todos

Request header:
{
    "Content-Type": "application/json"
}

Request body:
{
	"title": "Mandi",
	"description": "Mandi yang bersih, jangan lupa sabunan sama sampoan",
	"status": false,
	"due_date": "2020-3-24"
}

Response if post successfully:
{
    "id": 9,
    "title": "Mandi",
    "description": "Mandi yang bersih, jangan lupa sabunan sama sampoan",
    "status": false,
    "due_date": "2020-03-23T17:00:00.000Z",
    "updatedAt": "2020-03-02T09:41:17.961Z",
    "createdAt": "2020-03-02T09:41:17.961Z"
}

Response if title is empty or due_date format is wrong or both:
{
    "status_code": 400,
    "type": "Validation Error",
    "message": [
        "Silahkan memasukkan tanggal due date dengan format YYYY-MM-DD",
        "Title todo tidak boleh kosong"
    ]
}

Response if something wrong with our server:
{
    "status_code": 500,
    "type": "Server Error",
    "err": {
        "name": "SequelizeConnectionError",
        "parent": {
            "name": "error",
            "length": 104,
            "severity": "FATAL",
            "code": "28P01",
            "file": "auth.c",
            "line": "329",
            "routine": "auth_failed"
        },
        "original": {
            "name": "error",
            "length": 104,
            "severity": "FATAL",
            "code": "28P01",
            "file": "auth.c",
            "line": "329",
            "routine": "auth_failed"
        }
    }
}
_______________________________________________________________________

GET /todos

Response if get data successfully:
[
    {
        "id": 1,
        "title": "Mandi",
        "description": "Mandi yang bersih, jangan lupa sabunan sama sampoan",
        "status": false,
        "due_date": "2020-03-23T17:00:00.000Z",
        "createdAt": "2020-03-02T10:24:11.173Z",
        "updatedAt": "2020-03-02T10:24:11.173Z"
    },
    {
        "id": 2,
        "title": "Berangkat Sekolah",
        "description": "Naik gojek, biar ga terlambat",
        "status": false,
        "due_date": "2020-03-24T17:00:00.000Z",
        "createdAt": "2020-03-02T10:25:05.534Z",
        "updatedAt": "2020-03-02T10:25:05.534Z"
    }
]

Response if something wrong with our server:
{
    "status_code": 500,
    "type": "Server Error",
    "err": {
        "name": "SequelizeConnectionError",
        "parent": {
            "name": "error",
            "length": 104,
            "severity": "FATAL",
            "code": "28P01",
            "file": "auth.c",
            "line": "329",
            "routine": "auth_failed"
        },
        "original": {
            "name": "error",
            "length": 104,
            "severity": "FATAL",
            "code": "28P01",
            "file": "auth.c",
            "line": "329",
            "routine": "auth_failed"
        }
    }
}
_______________________________________________________________________

GET /todos/:id

Response if get data by id successfully:
{
    "id": 2,
    "title": "Berangkat Sekolah",
    "description": "Naik gojek, biar ga terlambat",
    "status": false,
    "due_date": "2020-03-24T17:00:00.000Z",
    "createdAt": "2020-03-02T10:25:05.534Z",
    "updatedAt": "2020-03-02T10:25:05.534Z"
}

Response if data is not found:
{
    "status_code": 404,
    "message": "Data Not Found"
}

Response if something wrong with our server:
{
    "status_code": 500,
    "type": "Server Error",
    "err": {
        "name": "SequelizeConnectionError",
        "parent": {
            "name": "error",
            "length": 104,
            "severity": "FATAL",
            "code": "28P01",
            "file": "auth.c",
            "line": "329",
            "routine": "auth_failed"
        },
        "original": {
            "name": "error",
            "length": 104,
            "severity": "FATAL",
            "code": "28P01",
            "file": "auth.c",
            "line": "329",
            "routine": "auth_failed"
        }
    }
}
_______________________________________________________________________

PUT /todos/:id

Request header:
{
    "Content-Type": "application/json"
}

Response if put successfully:
{
    "id": 2,
    "title": "Berangkat Sekolah",
    "description": "Naik gojek, biar ga terlambat",
    "status": false,
    "due_date": "2020-03-24T17:00:00.000Z",
    "createdAt": "2020-03-02T10:25:05.534Z",
    "updatedAt": "2020-03-02T10:25:05.534Z"
}

Response if data is not found:
{
    "status_code": 404,
    "message": "Data Not Found"
}

Response if title is empty or due_date format is wrong or both:
{
    "status_code": 400,
    "type": "Validation Error",
    "message": [
        "Silahkan memasukkan tanggal due date dengan format YYYY-MM-DD",
        "Title todo tidak boleh kosong"
    ]
}

Response if something wrong with our server:
{
    "status_code": 500,
    "type": "Server Error",
    "err": {
        "name": "SequelizeConnectionError",
        "parent": {
            "name": "error",
            "length": 104,
            "severity": "FATAL",
            "code": "28P01",
            "file": "auth.c",
            "line": "329",
            "routine": "auth_failed"
        },
        "original": {
            "name": "error",
            "length": 104,
            "severity": "FATAL",
            "code": "28P01",
            "file": "auth.c",
            "line": "329",
            "routine": "auth_failed"
        }
    }
}
_______________________________________________________________________

DELETE /todos/:id

Response if delete by id successfully:
{
    "id": 2,
    "title": "Berangkat Sekolah",
    "description": "Naik gojek, biar ga terlambat, jangan lupa bawa payung soalnya sorenya ujan",
    "status": false,
    "due_date": "2020-03-24T17:00:00.000Z",
    "createdAt": "2020-03-02T10:25:05.534Z",
    "updatedAt": "2020-03-02T10:34:57.178Z"
}

Response if data is not found:
{
    "status_code": 404,
    "message": "Data Not Found"
}

Response if something wrong with our server:
{
    "status_code": 500,
    "type": "Server Error",
    "err": {
        "name": "SequelizeConnectionError",
        "parent": {
            "name": "error",
            "length": 104,
            "severity": "FATAL",
            "code": "28P01",
            "file": "auth.c",
            "line": "329",
            "routine": "auth_failed"
        },
        "original": {
            "name": "error",
            "length": 104,
            "severity": "FATAL",
            "code": "28P01",
            "file": "auth.c",
            "line": "329",
            "routine": "auth_failed"
        }
    }
}