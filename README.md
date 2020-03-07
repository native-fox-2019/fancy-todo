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


<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>
