# fancy-todo

Fancy To-Do Single Page App With Express, Postgres, Sequelize, and jQuery
___________
## 3rd Party API
1. Geo js : used to get the user's IP address and country code the country the user is located in
2. Calendarific : used to get a list of holidays per year in the country where the user is located
3. GoQR.me : used to display the qr code of each todo and display a description of the todo
___________

## REST API Documentation

### Todo Routing:

Route | HTTP | Header(s) | Body | Description
--- | --- | --- | --- | ---
/todo | GET | token | none | Read All User's Todo
/todo/:id | GET | token | none | Read one User's Todo by Id
/todo | POST | token | title: string, description: string, due_date: date | Create User's Todo
/todo/:id | PUT | token | title: string, description: string, due_date: date, status: boolean | Edit User's Todo by Id
/todo/:id | DELETE | token | none | Delete User's Todo by Id

### User Routing:

Route | HTTP | Header(s) | Body | Description
--- | --- | --- | --- | ---
/login | POST | none | email: string, password: string | Login User
/register | POST | none | name: string, email: string, password: string | Create New User
/googleLogin | POST | none | name: string, email: string, password: string | Create New User with Goole OAuth 2.0

### Holiday Routing:
Route | HTTP | Header(s) | Body | Description
--- | --- | --- | --- | ---
/ | GET | none | none | List All Holiday in This Year by Your Current Country
