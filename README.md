# fancy-todo
### by Henarivan Andhika Abhirama


Link to postman documentations: https://documenter.getpostman.com/view/10571131/SzKbKuJS

## GET /todos
Get all todos that the user have

### Properties data types
- token : String

#### Request Header
```javascript
{
   "token" : "<your_token>" 
}
```

### Request Body
```javascript
[
  {
    "id": 75,
    "title": "wewafd",
    "description": "wew",
    "status": "Not Started",
    "due_date": "2020-03-08",
    "createdAt": "2020-03-07T04:05:58.726Z",
    "updatedAt": "2020-03-07T04:19:02.101Z",
    "UserId": 6
  },
  {
    "id": 76,
    "title": "Berhasil diedit",
    "description": "Membuat route sesuai REST dan membuat dokumentasi",
    "status": "Not Started",
    "due_date": "2020-03-04",
    "createdAt": "2020-03-07T04:10:58.064Z",
    "updatedAt": "2020-03-07T04:44:03.927Z",
    "UserId": 6
  },
  {
    "id": 77,
    "title": "Belajar gituan",
    "description": "gituan apa si",
    "status": "Not Started",
    "due_date": "2020-03-08",
    "createdAt": "2020-03-07T04:36:08.958Z",
    "updatedAt": "2020-03-07T04:36:08.958Z",
    "UserId": 6
  }
]
```