# fancy-todo
Todo:
https://documenter.getpostman.com/preview/10575809-13b97c5e-abb2-44b1-8bd8-9f42fc31ed82?versionTag=latest&apiName=CURRENT&version=latest&top-bar=ffffff&right-sidebar=303030&highlight=ef5b25

## TODO ROUTING

|    ROUTE     |HTTP            | HEADERS  | BODY  | DESCRIPTION  |
| ------------- |:-------------:| -----:|-----:|-----:|
| /TODOS        |          POST | TOKEN |TITLE:string,DESCRIPTION:string,STATUS:string      |Create Todos |
|/TODOS        | GET      |  TOKEN |NONE |GET TODO BY ID |
| /TODOS/:ID | GET| TOKEN |NONE |GET TODOS BY ID |
| /TODOS/:ID | PUT| TOKEN |TITLE:string,DESCRIPTION:string,STATUS:string  |UPDATE CERTAIN TODO BY ID |
| /DELETE/:ID | DELETE| TOKEN |NONE  |DELETE TODO BY ID |


## USER ROUTING

|    ROUTE     |HTTP            | HEADERS  | BODY  | DESCRIPTION  |
| ------------- |:-------------:| -----:|-----:|-----:|
| /USERS/REGISTER        |          POST | NONE |NAME:string,EMAIL:string,PASSWORD:string      |Create Users |
| /USERS/LOGIN           |          POST | NONE |NAME:string,EMAIL:string,PASSWORD:string      |Login to Todos |
| /TODOS/glSign          | POST| NONE |NONE |LOGIN GL USERS |

## USAGE:
1. $ GIT CLONE
2. Extract fancy-todo-client.zip
3. $ npm install 
.. Do this in main folder and client folder
4. run app.js (nodemon is better)
5. on the client folder do live-server
6. ....Profit

## API USED:
1. HOLIDAYS
.. i used this to show any Holiday or some religious event that happen in indonesia, but i disabled it (since it's kinda relevant)
2. GOQR API 
.. used to generate qrCodes that contain your todos information. 
