
function signOutGoogle() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

$("#form-register").submit(function(event){
    event.preventDefault()
    var email = $("#email").val()
    var password = $("#password").val()
    console.log(email)
    console.log(password)
    $.ajax({
        type: "POST", 
        url: "http://localhost:3000/user/register", 
        data: {email:email, password: password},
        success: function(result){
          console.log("success")
          console.log(result)       
          $("#register-form").hide()
          $("#login-form").show()
        }
    })
})

$("#loginInRegister").click(function(event){
        $("#register-form").hide()
        $("#login-form").show()
}) 

$("#form-login").submit(function(event){
        event.preventDefault()
        var email_login = $("#email_login").val()
        var password_login = $("#password_login").val()
        console.log(email_login)
        console.log(password_login)
        $.ajax({
            type: "POST", 
            url: "http://localhost:3000/user/login", 
            data: {email:email_login, password: password_login},
            success: function(result){
              console.log("success")
              console.log(result)
              localStorage.setItem('token', result.token)
              $("#login-form").hide()
              $("#table-show").show()
              tableshow()
            }
        })
})
  
function tableshow(){
    $.ajax({
        type: "GET", 
        url: "http://localhost:3000/todos", 
        headers: {"token": localStorage.getItem('token')},
        success: function(result){
                console.log(result.response)
                for (let i=0; i<result.response.length; i++){
                    var data=result.response[i]
                $('#list-todos').append(`
                <tr>
                    <th id="dataId" hidden>${data.id}</th>
                    <th id="dataTitle">${data.title}</th>
                    <th id="dataDescription">${data.description}</th>
                    <th id="dataStatus">${data.status}</th>
                    <th id="dataDueDate">${data.due_date}</th>
                    <th id="dataUserId">${data.userId}</th>
                    <th>
                        <input onClick="editFunction(${data.id})" id="todo-del" type="button" value="Edit">
                        <input onclick="deleteFunction(${data.id})" id="todo-del" type="button" value="Delete">
                    </th>
                </tr>
                `)
                console.log("success")
                }
        },
    })
}

$("#addInTable").click(function(event){
    $("#table-show").hide()
    $("#create-form").show()
})
    
$("#form-create-todos").submit(function(event){
    event.preventDefault()
    var title = $("#title").val()
    var description = $("#description").val()
    var status = $("#status").val()
    var due_date = $("#due_date").val()
    console.log(`${title}, ${description}, ${status}, ${due_date}`)
    var a = localStorage.getItem('token')
    console.log("-----")
    console.log(a)
    $.ajax({
        type: "POST", 
        url: "http://localhost:3000/todos", 
        headers: {"token": localStorage.getItem('token')},
        data: {title: title, description: description, status: status, due_date: due_date},
        success: function(result){
          console.log(result)
          $("#create-form").hide()
          $("#list-todos").remove()
          $("#table-show").show()
          tableshow()
          console.log("show table")
        }
    })
  })

$("#cancel-create").click(function(event){
    $("#create-form").hide()
    $("#table-show").show()
}) 

function deleteFunction(id){
        console.log(id)
        $.ajax({
            type: "DELETE", 
            url: "http://localhost:3000/todos/"+id, 
            headers: {"token": localStorage.getItem('token')},
            success: function(result){
                console.log("success")
                }
        })
    }

function editFunction(id){
        $.ajax({
            type: "GET", 
            url: "http://localhost:3000/todos/"+id, 
            headers: {"token": localStorage.getItem('token')},
            success: function(result){
                console.log("yes")
                console.log(result)
                console.log(id)
                $("#table-show").hide()
                $("#form-edit").show(result)
            }
        })
    }


$("#form-edit-todos").submit(function(event){
    event.preventDefault()
    var title = $("#title").val()
    var description = $("#description").val()
    var status = $("#status").val()
    var due_date = $("#due_date").val()
    console.log(`${title}, ${description}, ${status}, ${due_date}`)
    var a = localStorage.getItem('token')
    console.log("-----")
    console.log(a)
    $.ajax({
        type: "PUT", 
        url: "http://localhost:3000/todos/"+id, 
        headers: {"token": localStorage.getItem('token')},
        data: {title: title, description: description, status: status, due_date: due_date},
        success: function(result){     
        console.log(result)
        }
    })
})
    


       







    

