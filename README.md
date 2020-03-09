# fancy-todo

The fancy-todo application is developed using express, posgresql, sequelize, and to be run by nodemon. The example is created in localhost

This application is deployed in heroku for backend and firebase for frontend as following link:
https://git.heroku.com/thawing-escarpment-77634.git

------------
Method & URL 
GET | POST | DELETE | PUT
Example of method and url can be found in link: 
https://documenter.getpostman.com/view/10571187/SzRw3s4L?version=latest

-----------
URL Params

Required:
id=[integer]

-----------
Data Params

title : string
description : string
status : string
due_date : string

-----------
Success Response:
Code: 200 
Code: 201 

Error Response:
Code: 400
Code: 401
Code: 500

----------
API

API from https://openweathermap.org/current is being used to get the updated weather in Jakarta
API from https://newsapi.org is being used to get updated news from around the world

----------
.ENV 
file .ENV template is provided as example of data to be provided