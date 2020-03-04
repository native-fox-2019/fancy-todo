# fancy-todo

Client ID: 687883796109-1jba27sbtts16dl43s3hd1939rcqad3s.apps.googleusercontent.com

Client secret: 7w0ognno30GT3dwQ9kXA2yJY

{"web":{"client_id":"687883796109-1jba27sbtts16dl43s3hd1939rcqad3s.apps.googleusercontent.com","project_id":"my-project-1583319480099","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"7w0ognno30GT3dwQ9kXA2yJY","redirect_uris":["http://localhost:3000"]}}

The fancy-todo is developed using express, posgresql, sequelize, and to be run by nodemon. The example is created in localhost


Method & URL 

/todos : to show all todos list
/todos/:id : to show detail of todo based on id
/todos/



GET | POST | DELETE | PUT

URL Params

<If URL params exist, specify them in accordance with name mentioned in URL section. Separate into optional and required. Document data constraints.>

Required:

id=[integer]



Data Params

<If making a post request, what should the body payload look like? URL Params rules apply here too.>

Success Response:

<What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!>

Code: 200 
Content: { id : 12 }
Error Response:

<Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be.>

Code: 401 UNAUTHORIZED 
Content: { error : "Log in" }
OR

Code: 422 UNPROCESSABLE ENTRY 
Content: { error : "Email Invalid" }
Sample Call:

<Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable.>

Notes:

<This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here.>