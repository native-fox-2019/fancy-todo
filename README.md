# fancy-todo

Fancy To-Do Sangle Page App With Express, Postgres, Sequelize, and jQuery

## REST API Documentation

### Todo Routing:

Route | HTTP | Header(s) | Body | Description
--- | --- | --- | --- | ---
/todo | GET | token | none | Read All User's Todo
/todo/:id | GET | token | none | Read one User's Todo by Id
/todo | POST | token | title: string, description: string, due_date: date | Create User's Todo
/todo/:id | PUT | token | title: string, description: string, due_date: date, status: boolean | Edit User's Todo by Id
/todo/:id | DELETE | token | none | Delete User's Todo by Id
