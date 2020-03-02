# Fancy To-Do list API

Link: 

```
http://localhost:8080/
```



API :

```

```



#### Before you do anything else..

```
$ npm install
```



## .ENV Tempelates

```


```



## Database

- Postgres 
- Sequelize 



## Main Routes

| Routes |
| :----: |
| /todos |



## Todos Routes

| Routes | Method | Body                                                         |      | Result                               |
| ------ | ------ | ------------------------------------------------------------ | ---- | ------------------------------------ |
| /      | get    |                                                              |      | returns all todos on db              |
| /      | post   | title:<string><br/> description:<string><br/> status:<string><br/> due_date:<strin><br/> |      | Create Todos                         |
| /:id   | get    |                                                              |      | returns a todos based on params id   |
| /:put  | put    | title:<string><br> description:<string><br> status:<string><br> due_date:<strin><br> |      | update a question for logged in user |
| /:id   | delete |                                                              |      | delete based on params id            |



# Middlewares

This app uses 2 middlewares **Authentication** and **ErrorHandler**



### Authentication:



### ErrorHandler:

​		Handles all errors

### Postman API Documentasi :

```
https://documenter.getpostman.com/view/3757275/SWTHbFJM

```

