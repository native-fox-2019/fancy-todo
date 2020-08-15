
<h1 align ="center">

fancy-Todo
</h1>

## Server router of Todo-List :

### 1.  POST /todos
* Request Header :
        token : token

        Content-Type :  application/x-www-form-urlencoded
******

* Request Body :

        title : "Write Documentation"

        description : "it is really important to do whwn coding"

        status : "on progress"

        due_date : {{currentdate}} // made custom by me
******

* Success response with status (201) :

        {
            "id": 5,
            "title": "Write Documentation",
            "description": "it is really important to do whwn coding",
            "status": "on progress",
            "due_date": "2020-02-29T17:00:00.000Z",
            "updatedAt": "2020-03-02T09:28:57.493Z",
            "createdAt": "2020-03-02T09:28:57.493Z"
        }
******
* Validation Error response with status (400) :

    if one of Request Body form is empty (title for sample) :

        {
            "message": [
                "title can not be empty!"
            ]
        }
    ******
* Internal Server Error response with status (500) :

    Typo in server sample :

        {
             "message": "Internal server error!"
        }
******

<br></br>

### 2. GET /todos

* Request Header :
        token : token

* Success response with status (200) :

        [
            {
                "id": 1,
                "title": "handling error",
                "description": "hendling error with middleware",
                "status": "on progress",
                "due_date": "2020-02-29T17:00:00.000Z",
                "createdAt": "2020-03-02T08:43:15.403Z",
                "updatedAt": "2020-03-02T08:43:15.403Z"
            },
            {
                "id": 2,
                "title": "handling internal server",
                "description": "hendling error with middleware",
                "status": "on progress",
                "due_date": "2020-02-29T17:00:00.000Z",
                "createdAt": "2020-03-02T08:46:55.905Z",
                "updatedAt": "2020-03-02T08:46:55.905Z"
            },
            {
                "id": 3,
                "title": "handling internal server",
                "description": "hendling error with middleware",
                "status": "on progress",
                "due_date": "2020-02-29T17:00:00.000Z",
                "createdAt": "2020-03-02T08:56:28.809Z",
                "updatedAt": "2020-03-02T08:56:28.809Z"
            },
            {
                "id": 4,
                "title": "handling internal server",
                "description": "hendling error with middleware",
                "status": "on progress",
                "due_date": "2020-02-29T17:00:00.000Z",
                "createdAt": "2020-03-02T09:00:31.025Z",
                "updatedAt": "2020-03-02T09:00:31.025Z"
            },
            {
                "id": 5,
                "title": "Write Documentation",
                "description": "it is really important to do whwn coding",
                "status": "on progress",
                "due_date": "2020-02-29T17:00:00.000Z",
                "createdAt": "2020-03-02T09:28:57.493Z",
                "updatedAt": "2020-03-02T09:28:57.493Z"
            }
        ]

*****

* Internal Server Error response with status (500) :

    Typo in server sample :

        {
             "message": "Internal server error!"
        }
******

<br></br>


### 3. GET /todos/:id

* Request Header :
        token : token



* Success response with status (200) :

    Request req.params.id = 1


        {
            "id": 1,
            "title": "handling error",
            "description": "hendling error with middleware",
            "status": "on progress",
            "due_date": "2020-02-29T17:00:00.000Z",
            "createdAt": "2020-03-02T08:43:15.403Z",
            "updatedAt": "2020-03-02T08:43:15.403Z"
        }
*****

* Data Not Found Resposnse (404) :

    Request req.params.id = 6

        {
            "message": "Data not found!"
        }
*****

* Internal Server Error response with status (500) :

    Typo in server sample :

        {
             "message": "Internal server error!"
        }
******

<br></br>

### 4. PUT /todos/:id

* Request Header :
token : token

Content-Type :  application/x-www-form-urlencoded
******

* Request Body :

        title : "Put for edit data"

        description : "the most difficult"

        status : "on progress"

        due_date : {{currentdate}} // made custom by me
******

* Success response with status (200) :
        
     Request req.params.id = 2

        {
            "id": 2,
            "title": "Put for edit data",
            "description": "the most difficult",
            "status": "on progress",
            "due_date": "2020-02-29T17:00:00.000Z",
            "createdAt": "2020-03-02T08:46:55.905Z",
            "updatedAt": "2020-03-02T11:07:42.631Z"
        }
******

* Validation Error response with status (400) :

    if one of Request Body form is empty (description for sample) :

        {
            "message": [
               "description can not be empty!"
            ]
        }
******

* Data Not Found Resposnse (404) :
    
    Request req.params.id = 6

        {
            "message": "Data not found!"
        }

******

* Internal Server Error response with status (500) :

    Typo in server sample :

        {
             "message": "Internal server error!"
        }
******

<br></br>

### 5. PATCH /todos/:id

* Request Header :
        token : token
Content-Type :  application/x-www-form-urlencoded
******

* Request Body :
        status : "complated"
******

* Success response with status (200) :
        
     Request req.params.id = 2

        {
            "id": 2,
            "title": "Put for edit data",
            "description": "the most difficult",
            "status": "complated",
            "due_date": "2020-02-29T17:00:00.000Z",
            "createdAt": "2020-03-02T08:46:55.905Z",
            "updatedAt": "2020-03-02T11:07:42.631Z"
        }
******

* Validation Error response with status (400) :

    if one of Request Body form is empty (description for sample) :
******

* Data Not Found Resposnse (404) :
    
    Request req.params.id = 6

        {
            "message": "Data not found!"
        }

******

* Internal Server Error response with status (500) :

    Typo in server sample :

        {
             "message": "Internal server error!"
        }
******

<br></br>

### 6. DELETE /todos/:id
* Request Header :
        token : token

* Success response with status (200) :
* Request req.params.id = 2

        {
            "id": 4,
            "title": "handling internal server",
            "description": "hendling error with middleware",
            "status": "on progress",
            "due_date": "2020-02-29T17:00:00.000Z",
            "createdAt": "2020-03-02T09:00:31.025Z",
            "updatedAt": "2020-03-02T09:00:31.025Z"
        }
*****

* Data Not Found Resposnse (404) :
    
    Request req.params.id = 6

        {
            "message": "Data not found!"
        }
*****

* Internal Server Error response with status (500) :

    Typo in server sample :

        {
             "message": "Internal server error!"
        }
******

===========================USER SIDE==================================

### 1. POST /user/register

* Request Header :

Content-Type :  application/x-www-form-urlencoded
******

* Request Body :

        username : "gusti"

        email : "gusti@gusti.com"

        password : "123"

******
* Success response with status (200) :

        {
            "id": 2,
            "username":gusti,
            "email":"gusti@gusti.com",
            "password":"edahhdjasfjdjbsfkjdaYJvvbyiVIYJHVUJYHVUZJCVujzgcT HGVYJH",
            "createdAt": "2020-03-02T08:46:55.905Z",
            "updatedAt": "2020-03-02T11:07:42.631Z"
        }
******

* Data Not Found Resposnse (404) :

        {
            "message": "use name can not be empty!"
        }
*****

* Internal Server Error response with status (500) :

    Typo in server sample :

        {
             "message": "Internal server error!"
        }
******



### 2. POST /user/login
* Request Header :

Content-Type :  application/x-www-form-urlencoded
******

* Request Body :

        email : "gusti@gusti.com"

        password : "123"

******
* Success response with status (200) :

      
******

* Data Not Found Resposnse (404) :
                                {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJndXN0aUBndXN0aS5jb20iLCJpYXQiOjE1ODQzNTE3MjB9.jW9kUpIL0vLd1Eo7Re0ncxhzidmK8kqIKctKqRkO800"}
        {
            "message": "use name can not be empty!"
        }
*****

* Internal Server Error response with status (500) :

    Typo in server sample :

        {
             "message": "Internal server error!"
        }
******




