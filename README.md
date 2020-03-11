# Fancy-todo API

This is the documentation for using FANCY TODO API. The base url for this API is `https://sheltered-taiga-06623.herokuapp.com`

This API is using email validator API

To use this app with user interface, kindly visit this link https://todo-fancy-1583330074366.firebaseapp.com/

### 1. Register (If you Already have an account, you can skip this part)

* **URL**
  
  /user/register

* **METHOD**
  
  `POST`

* **REQUEST BODY**
  
  Using JSON

  ```javascript
  {
	"first_name": "Adhiyatma",
	"last_name": "Pramayoga",
	"email": "adhiyatma.pramayoga@gmail.com",
	"password": "secretPassword123"
  }
  ```

* **SUCCESS RESPONSE**
  
  * CODE: 200 
  * Content:
  
    ```javascript
    {
        "id": 16,
        "first_name": "Adhiyatma",
        "last_name": "Pramayoga",
        "email": "adhiyatma.pramayoga@gmail.com",
        "password": "$2b$08$YfyuqhM0Q7zP2WtF9iIZROufOnsV0s4W5Nr7Wh.Eu9xnjAk5AOZc6",
        "updatedAt": "2020-03-07T08:25:50.208Z",
        "createdAt": "2020-03-07T08:25:50.208Z"
    }
    ```

* **ERROR RESPONSE**
  
  * Empty Requirement (empty request body)
    
    * CODE: 400
    
    * Content:
        
      ```javascript
        {
            "status": 400,
            "error": [
                {
                    "path": "first_name",
                    "type": "Validation error",
                    "msg": "Please input your name"
                },
                {
                    "path": "password",
                    "type": "Validation error",
                    "msg": "Please input the password"
                }
            ]
        }
      ```

  * Email Validation Error
    
    *   CODE: 400

    *   Content:

        Wrong format email

        ```javascript
        {
            "status": 400,
            "msg": "Invalid format"
        }
        ```

        Email not found

        ```javascript
        {
            "status": 400,
            "msg": "Email not Found"
        }
        ```

### 2. Log In

* **URL**
  
  /user/login

* **METHOD**
  
  `POST`

* **REQUEST BODY**
  
  Using JSON

  ```javascript
  {
	"email": "adhiyatma.pramayoga@gmail.com",
	"password": "secretPassword123"
  }
  ```

* **SUCCESS RESPONSE**
  
  * CODE: 200 
  * Content:
  
    ```javascript
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImVtYWlsIjoiYWRoaXlhdG1hLnByYW1heW9nYUBnbWFpbC5jb20iLCJpYXQiOjE1ODM1NzA3NjN9.IowZiHVsopN5XrvJ_U-l8hOai0LnkTWufgvnALDHm-s"
    }
    ```

    **Save the token**

* **ERROR RESPONSE**
  
  * Email not Found
    
    * CODE: 404
    
    * Content:
        
      ```javascript
        {
            "status": 404,
            "msg": "wrong email"
        }
      ```

  * Wrong Password
    
    *   CODE: 400

    *   Content:

        ```javascript
        {
            "status": 400,
            "msg": "wrong password"
        }
        ```

### 3. Get Todos

* **URL**
  
  /todos

* **METHOD**
  
  `GET`

* **HEADERS**
  
  KEY:

    * token (the token you get after log-in)
  

* **SUCCESS RESPONSE**
  
  * CODE: 200 
  * Content:
  
    ```javascript
    [
        {
            "id": 20,
            "title": "Menambahkan swal",
            "description": "menambahkan swal pada delete",
            "status": "On progress",
            "due_date": "2020-03-07T00:00:00.000Z",
            "createdAt": "2020-03-05T05:43:29.010Z",
            "updatedAt": "2020-03-07T07:53:45.033Z",
            "UserId": 1
        },
        {
            "id": 38,
            "title": "testing lagi",
            "description": "testtest",
            "status": "On progress",
            "due_date": "2020-03-07T00:00:00.000Z",
            "createdAt": "2020-03-05T12:22:59.608Z",
            "updatedAt": "2020-03-07T07:53:52.387Z",
            "UserId": 1
        },
        {
            "id": 71,
            "title": "fitur email verification",
            "description": "menambahkan fitur email verification saat register di fancy todo",
            "status": "Uncomplete",
            "due_date": "2020-03-07T00:00:00.000Z",
            "createdAt": "2020-03-07T03:39:05.852Z",
            "updatedAt": "2020-03-07T07:54:04.130Z",
            "UserId": 1
        },
        {
            "id": 1,
            "title": "Test error",
            "description": "testing error",
            "status": "Completed",
            "due_date": "2020-04-08T00:00:00.000Z",
            "createdAt": "2020-03-02T07:22:04.436Z",
            "updatedAt": "2020-03-05T11:12:49.101Z",
            "UserId": 1
        }
    ]
    ```

* **ERROR RESPONSE**
  
  * Server Error
    
    * CODE: 500
    
    * Content:
        
      ```javascript
        {
            "status": 500,
            "msg": "Server Error"
        }
      ```

### 4. Add Todo

* **URL**
  
  /todos

* **METHOD**
  
  `POST`

* **HEADERS**
  
  KEY:

    * token (the token you get after log-in)
  
* **REQUEST BODY**
  
  Using JSON

  ```javascript
  {
        "title": "testing client",
        "description": "test client",
        "status": "Uncomplete",
        "due_date": "2020-04-08T00:00:00.000Z"
  }
  ```

* **SUCCESS RESPONSE**
  
  * CODE: 201
  * Content:
  
    ```javascript
    {
        "id": 73,
        "title": "testing client",
        "description": "test client",
        "status": "Uncomplete",
        "due_date": "2020-04-08T00:00:00.000Z",
        "UserId": 1,
        "updatedAt": "2020-03-07T09:01:10.074Z",
        "createdAt": "2020-03-07T09:01:10.074Z"
    }
    ```

* **ERROR RESPONSE**
  
  * Validation Error
    
    * CODE: 400
    
    * Content:
        
        ```javascript
        {
            "status": 400,
            "error": [
                {
                    "type": "Validation error",
                    "msg": "Please input the title"
                },
                {
                    "type": "Validation error",
                    "msg": "Please input the description"
                }
            ]
        }
        ```

  * Server Error
    
    * CODE: 500
    
    * Content:
        
        ```javascript
        {
            "status": 500,
            "msg": "Server Error"
        }
        ```

### 5. Get Todo by Id

* **URL**
  
  /todos/_todoId_

* **METHOD**
  
  `GET`

* **HEADERS**
  
  KEY:

    * token (the token you get after log-in)

* **SUCCESS RESPONSE**
  
  * CODE: 200 
  * Content:
  
    ```javascript
    {
        "id": 73,
        "title": "testing client",
        "description": "test client",
        "status": "Uncomplete",
        "due_date": "2020-04-08T00:00:00.000Z",
        "createdAt": "2020-03-07T09:01:10.074Z",
        "updatedAt": "2020-03-07T09:01:10.074Z",
        "UserId": 1
    }
    ```

* **ERROR RESPONSE**
  
  * Not Found
    
    * CODE: 404
    
    * Content:
        
        ```javascript
        {
            "status": 404,
            "msg": "404 Not Found"
        }
        ```

  * Server Error
    
    * CODE: 500
    
    * Content:
        
        ```javascript
        {
            "status": 500,
            "msg": "Server Error"
        }
        ```

### 6. Edit Todo

* **URL**
  
  /todos/_todoId_

* **METHOD**
  
  `PUT`

* **HEADERS**
  
  KEY:

    * token (the token you get after log-in)
  
* **REQUEST BODY**
  
  Using JSON

  ```javascript
  {
        "title": "test error",
        "description": "testing error",
        "status": "complete",
        "due_date": "2020-04-08T00:00:00.000Z"
  }
  ```

* **SUCCESS RESPONSE**
  
  * CODE: 201
  * Content:
  
    ```javascript
    {
        "title": "test error",
        "description": "testing error",
        "status": "complete",
        "due_date": "2020-04-08T00:00:00.000Z",
        "UserId": 1
    }
    ```

* **ERROR RESPONSE**
  
  * Validation Error
    
    * CODE: 400
    
    * Content:
        
        ```javascript
        {
            "status": 400,
            "error": [
                {
                    "type": "Validation error",
                    "msg": "Please input the title"
                },
                {
                    "type": "Validation error",
                    "msg": "Please input the description"
                }
            ]
        }
        ```

  * Not Found
    
    * CODE: 404
    
    * Content:
        
        ```javascript
        {
            "status": 404,
            "msg": "404 Not Found"
        }
        ```

  * Server Error
    
    * CODE: 500
    
    * Content:
        
        ```javascript
        {
            "status": 500,
            "msg": "Server Error"
        }
        ```

### 7. Delete Todo

* **URL**
  
  /todos/_todoId_

* **METHOD**
  
  `DELETE`

* **HEADERS**
  
  KEY:

    * token (the token you get after log-in)

* **SUCCESS RESPONSE**
  
  * CODE: 200 
  * Content:
  
    ```javascript
    {
        "id": 73,
        "title": "testing client",
        "description": "test client",
        "status": "Uncomplete",
        "due_date": "2020-04-08T00:00:00.000Z",
        "createdAt": "2020-03-07T09:01:10.074Z",
        "updatedAt": "2020-03-07T09:01:10.074Z",
        "UserId": 1
    }
    ```

* **ERROR RESPONSE**
  
  * Not Found
    
    * CODE: 404
    
    * Content:
        
        ```javascript
        {
            "status": 404,
            "msg": "404 Not Found"
        }
        ```

  * Server Error
    
    * CODE: 500
    
    * Content:
        
        ```javascript
        {
            "status": 500,
            "msg": "Server Error"
        }
        ```
