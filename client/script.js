 //========================= BUTTON AREA =========================//

 $( document ).ready(function(){
    // localStorage.removeItem("token")
     var token = localStorage.getItem("token")
     if(token) {
         $("#button-signIn").hide()
         $("#button-signUp").hide()
         $("#button-signOut").show()
         $("#airWidget").show()
         getTodo()
         getQuotes();
         $("#getQuotes").show(200)
     } else{
         $("#signInForm").show()
         $("#button-signIn").show()
         $("#button-signUp").show()
     }

 })

 $("#button-signOut").on("click",function(){
     localStorage.removeItem("token")
     $("#signInForm").show()
     $("#TodoList").hide()
     $("#button-signIn").show()
     $("#button-signUp").show()
     $("#button-signOut").hide()
  })

 $("#button-addtodo-submit").on("click",function(){
     $("#addTodo").show()
     $("#TodoList").hide()
 })

 $("#button-cancel-submit").on("click",function(){
     $("#addTodo").hide()
     $("#TodoList").show()
 })

 //================== PARAMETER AREA =================//

 let firstName = $("#firstName")
 let lastName = $("#lastName")
 let email = $("#email")
 let password = $("#password")
 //========
 let emailLogin = $("#emailLogin")
 let passwordLogin = $("#passwordLogin")
 //=======
 let title = $("#title")
 let description = $("#description")
 let status = $("#status")
 let duedate = $("#duedate")
 //========
 let titleEdit = $("#title-edit")
 let descriptionEdit = $("#description-edit")
 let statusEdit = $("#status-edit")
 
 //==================== FORM AREA ==================//

 $("#form-signUp").on("submit",function(event){
     event.preventDefault()
     register()
     $("#signInForm").show()
     $("#signUpForm").hide()
 })

 $("#form-signIn").on("submit",function(event){
     event.preventDefault()
     login()

 })

 $("#form-addTodo").on("submit",function(event){
     event.preventDefault()
     addTodo()
 })

 //=============== FUNCTION AREA ===============//

 function register(){
     $.ajax({
         url : "http://localhost:3000/user/register",
         method : "post",
         contentType : "application/json",
         data : JSON.stringify({
             firstname : firstName.val(),
             lastname : lastName.val(),
             email : email.val(),
             password : password.val()
         }),
         success: function(data){
             console.log(data)
         }
     })

 }

 function login(){
     $.ajax({
         url : "http://localhost:3000/user/login",
         method : "post",
         contentType : "application/json",
         data : JSON.stringify({
             email : emailLogin.val(),
             password : passwordLogin.val()
         }),
         success: function(data){
             console.log(data)
             $("#signInForm").hide()
             $("#button-signIn").hide()
             $("#button-signUp").hide()
             $("#button-signOut").show()
             localStorage.setItem("token",data.token)   
             getTodo();
             getQuotes();
             $("#getQuotes").show(200)        
         },
         error: function(jqxhr,status,error){
             console.log("errr");
             $("#form-signIn").append(jqxhr.responseJSON)
         }
     })
 }

 function getTodo(){
     console.log('masuk')
     $.ajax({
         url : "http://localhost:3000/todos",
         method : "get",
         contentType : "application/json",
         headers : {token : localStorage.getItem("token")},
         success: function(response){
             $("#TodoTable").find('td').remove();
             response.forEach(element => {
                 var content = '<tr><td>'+element.status+'</td><td>'+element.title+'</td><td>'+element.description+'</td><td>'+element.due_date+'</td><td><input type="submit" class="deletesubmit" id="button-Delete-submit" onclick="deleteTodo('+element.id+')" value="Delete"></td><td><input type="submit" class="editsubmit" id="button-Edit-submit" onclick="editTodo('+element.id+')" value="Edit"></td></tr>'
                 $('#TableContent').append(content);
             });

         $("#TodoList").show()
         }

     })
 }

 function addTodo(){
     $.ajax({
         url : "http://localhost:3000/todos",
         method : "post",
         contentType : "application/json",
         headers : {token : localStorage.getItem("token")},
         data : JSON.stringify({
             title : title.val(),
             description : description.val(),
             due_date : duedate.val()
         }),
         success: function(data){
             console.log(data)
             
             $("#addTodo").hide()
             $("#button-signIn").hide()
             $("#button-signUp").hide()
             $("#button-signOut").show()
             getTodo()
             $("#TodoList").show()

         }

     })
 }

 function deleteTodo(id){
     $.ajax({
         url : `http://localhost:3000/todos/${id}`,
         method : "delete",
         contentType : "application/json",
         headers : {token : localStorage.getItem("token")},
         success: function(data){
             
             $("#addTodo").hide()
             $("#button-signIn").hide()
             $("#button-signUp").hide()
             $("#button-signOut").show()
             getTodo()
             $("#TodoList").show()

         }

     })
 }

 function editTodo(id){
     $.ajax({
         url : `http://localhost:3000/todos/${id}`,
         method : "get",
         contentType : "application/json",
         headers : {token : localStorage.getItem("token")},
         success: function(data){
             let id = data.id
             let title = data.title
             let description = data.description
             let status = data.status
             let duedate = data.due_date
             $("#editTodo").append(`<h3> Edit Todos </h3><br>
                                     <form id="form-editTodo" method="POST">
                                         <label for="fname">Title:</label><br>
                                         <input type="text" id="title-edit" name="title" value="${title}"><br>
                                         <label for="fname">Description:</label><br>
                                         <input type="text" id="description-edit" name="description" value="${description}"><br>
                                         <label for="fname">Status:</label><br>
                                         <select id="status-edit" class="select-style">
                                             <option value="uncompleted" ${status} === value? "selected" : "">uncompleted</option>
                                             <option value="on progress" ${status} === value? "selected" : "">on progress</option>
                                             <option value="completed" ${status} === value? "selected" : "">completed</option>
                                         </select><br>
                                         <br>
                                         <input type="submit" class="submit" id="button-edit-submit" value="Submit">
                                     </form> `)
             $("#editTodo").show()
             $("#TodoList").hide()
             $("#form-editTodo").on("submit",function(event){
                     event.preventDefault()
                     console.log(id)
                     updateTodo(id)      
             })
         }

     })
 }

 function updateTodo(id){
     editTodo(id)
     $.ajax({
         url : `http://localhost:3000/todos/${id}`,
         method : "put",
         contentType : "application/json",
         headers : {token : localStorage.getItem("token")},
         data : JSON.stringify({
             title : $("#title-edit").val(),
             description : $("#description-edit").val(),
             status : $("#status-edit").val()
         }),
         success: function(data){
             getTodo()
             $("#TodoList").show()
             $("#editTodo").hide()
         },
         error: function(jqxhr,status,error){
             console.log("errr");
             $("#form-signIn").append(jqxhr.responseJSON)
         }

     })
 }

 function getQuotes(){
     $.ajax({
         url : "http://localhost:3000/todos/quotes",
         method : "get",
         contentType : "application/json",
         headers : {token : localStorage.getItem("token")},
         success: function(data){
             $("#getQuotes").append(`<p>~${data.quotes}~</p>`)
         }

     })
 }

 function onSignIn(googleUser) {
     
     var id_token = googleUser.getAuthResponse().id_token;
     $.ajax({
         url : "http://localhost:3000/user/logingoogle",
         method : "post",
         contentType : "application/json",
         data : JSON.stringify({
             token : id_token
         }),
         success : function(data){
             console.log(data)
             $("#signInForm").hide()
             $("#button-signIn").hide()
             $("#button-signUp").hide()
             $("#button-signOut").show()
             localStorage.setItem("token",data.token)   
             getTodo();
             getQuotes();
             $("#getQuotes").show(200)        
         },
         error: function(jqxhr,status,error){
             console.log("errr");
             $("#form-signIn").append(jqxhr.responseJSON)
         }
     })
     console.log(id_token)
 }

 function signOut() {
     var auth2 = gapi.auth2.getAuthInstance();
     auth2.signOut().then(function () {
     console.log('User signed out.');
     });
 }