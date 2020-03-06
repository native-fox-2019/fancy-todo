$(`#register-form`).submit(function (event){
    event.preventDefault()
    console.log('register')
    let email= $(`#email-reg`).val()
    let password = $(`#password-reg`).val()
    let repassword = $(`#repassword-reg`).val()
    console.log(email+'   '+password)
    if (password!==repassword){
        alert(`Please input the same password!`)
    } else {
        console.log('ok')
        $.ajax({
            type: "POST", 
            url: "http://localhost:3000/user/register", 
            data: {
                email: email,
                password: password
            },
            success: function(result){
                console.log('sukses')
                $(`#register`).hide()
                $(`#login`).show()
            },
            error: function(err){
                alert(`Error : ${err.responseJSON.response}`)
            }
        })
    }
})

$(`#login-form`).submit(function (event){
    event.preventDefault()
    let email= $(`#email-login`).val()
    let password = $(`#password-login`).val()
        $.ajax({
            type: "POST", 
            url: "http://localhost:3000/user/login", 
            data: {
                email:email, 
                password: password
            },
            success: function(result){
              console.log("success")
              console.log(result)
              localStorage.setItem('token', result.token)
                $(`#login`).hide()
                $(`#todos`).show()
                listShow()
            },
            error: function(err){
                console.log(err)
                alert(`Error : ${err.responseJSON.response}`)
            }
        })
})

function listShow(){
    $.ajax({
        type: "GET", 
        url: "http://localhost:3000/todos", 
        headers: {"token": localStorage.getItem('token')},
        success: function(result){
                console.log(result.response)
                $(`#todos`).show()
                for (let i=0; i<result.response.length; i++){
                    var data=result.response[i]
                    console.log("ok")
                $('#list-todos').append(`
                <tr>
                    <th id="dataId" hidden>${data.id}</th>
                    <th id="dataTitle">${data.title}</th>
                    <th id="dataDescription">${data.description}</th>
                    <th id="dataStatus">${data.status}</th>
                    <th id="dataDueDate">${data.due_date}</th>
                    <th>
                        <button type="button" onclick=editTodo(${data.id}) class="btn btn-primary" id="btn-edit">Edit</button>
                        <button type="button" onclick=deleteTodo(${data.id}) class="btn btn-primary" id="btn-delete">Delete</button>
                    </th>
                </tr>
                `)
                console.log("yess")
                }
        },
        error: function(err){
            console.log(err)
            alert(`Error : ${err.responseJSON.response}`)
        }
    })
}

$(`#add-form`).submit(function (event){
    event.preventDefault()
    let newData={
        title: $(`#title`).val(),
        description: $(`#description`).val(),
        status: $(`#status`).val(),
        due_date: $(`#due_date`).val()
    }
    $.ajax({
        type: "POST", 
        url: "http://localhost:3000/todos", 
        data: newData,
        headers: {"token": localStorage.getItem('token')},
        success: function(result){
            console.log(result)
            $(`#add`).hide()
            $('#list-todos').empty()
            $(`#todos`).show()
            listShow()
        },
        error: function(err){
            alert(`Error : ${err.responseJSON.response}`)
        } 
    })
})

function deleteTodo(id){
    console.log(id)
    $.ajax({
        type: "DELETE", 
        url: "http://localhost:3000/todos/"+id, 
        headers: {"token": localStorage.getItem('token')},
        success: function(result){
            console.log("success")
            $('#list-todos').empty()
            $(`#todos`).show()
            listShow()
            },
        error: function(err){
            alert(`Error : ${err.responseJSON.response}`)
        } 
    })
}

function editTodo(id){
    $.ajax({
        type: "GET", 
        url: "http://localhost:3000/todos/"+id, 
        headers: {"token": localStorage.getItem('token')},
        success: function(result){
            console.log(result)
            $(`#title`).remove()
            $(`#description`).remove()
            $(`#status`).remove()
            $(`#todo-id`).remove()
            $(`#due_date`).remove()
            $(`#todos`).hide()
            $(`#edit`).show()
            $(`#title-edit`).append(`<input type="title " class="form-control" id="title" value="${result.response.title}">`)
            $('#desc-edit').append(`<input type="description" class="form-control" id="description" value="${result.response.description}">`)
            $('#status-edit').append(`<select class="custom-select" id="status">
            <option selected>${result.response.status}</option>
            <option>Not started</option>
            <option>Ongoing</option>
            <option>Done</option>
          </select>
          <input type="hidden" id="todo-id" value="${result.response.id}">`)
            $(`#due_date-edit`).append(`<input type="date" class="form-control" name="due_date" id="due_date" value="${result.response.due_date}">`)
        },
        error: function(err){
            alert(`Error : ${err.responseJSON.response}`)
        }
    })
}

$(`#edit-form`).submit(function(event){
    event.preventDefault()
    let id = $(`#todo-id`).val()
    console.log(id+"<<<id")
    let newData= {
        title: $(`#title`).val(),
        description: $(`#description`).val(),
        status: $(`#status`).val(),
        due_date: $(`#due_date`).val()
    }
    console.log(id, newData)
    $.ajax({
        type: "PUT", 
        url: "http://localhost:3000/todos/"+id, 
        data: newData,
        headers: {"token": localStorage.getItem('token')},
        success: function(result){
            console.log(result)
            $(`#edit`).hide()
            $('#list-todos').empty()
            $(`#todos`).show()
            listShow()
        },
        error: function(err){
            alert(`Error : ${err.responseJSON.response}`)
        } 
    })
})
