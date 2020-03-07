# Fancy To-Do list API

Link: 

```
http://localhost:8080/
```



API :

```
mailboxvalidator
sendgrid
```



#### Before you do anything else..

```
$ npm install
```



## .ENV Tempelates

```
JWT="jwt secret"
GoogleClienId="googleCLientId"
DefaultPassword="minimal 6 karakter"
API_KEY="mailvalidator"
SENDGRID_API_KEY="sendgrid"

```



## Database

- Postgres 
- Sequelize 



## Main Routes Todos

| Routes |
| :----: |
| /todos |



## Todos Routes

| Routes | Method | Body                                                         |      | Descriptions                         |
| ------ | ------ | ------------------------------------------------------------ | ---- | ------------------------------------ |
| /      | get    |                                                              |      | returns all todos on db              |
| /      | post   | title:<string><br/> description:<string><br/> status:<string><br/> due_date:<strin><br/> |      | Create Todos                         |
| /:id   | get    |                                                              |      | returns a todos based on params id   |
| /:put  | put    | title:<string><br> description:<string><br> status:<string><br> due_date:<strin><br> |      | update a question for logged in user |
| /:id   | delete |                                                              |      | delete based on params id            |



## Main Routes Users

| Routes |      |
| ------ | ---- |
| /users |      |



## Users Routes

| Routes    | Method | Descriptions                                                 |
| --------- | ------ | ------------------------------------------------------------ |
| /register | post   | register user with username (string)<br> email (string)<br>email(string)<br> |
| /login    | post   | login user data form email(string)<br> password(string)      |
|           |        |                                                              |

# Middlewares

This app uses 2 middlewares **Authentication** and **ErrorHandler**



### Postman API Documentasi :

```
https://documenter.getpostman.com/view/3757275/SWTHbFJM
```

