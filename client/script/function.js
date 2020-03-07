function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token
    $.ajax({
        method: "post",
        url: "Http://localhost:3000/users/googleLogin",
        data: {
            token: id_token
        },
        success: (data) => {
            localStorage.setItem('token', data.token)
            $('#login-render').hide()
            $('#register-render').hide()
            $('#logout-btn').show()
            $('#todo-btn').show()
            $('.box').hide()
            $('#login-form')[0].reset()
            showTodos()
            $('#todo-box').fadeIn()
        },
        error: (jqXHR, error, thrownErr) => {
            console.log(jqXHR.status, jqXHR.statusMessage, 'error')
        }
    });
}

function showHolidays(){
    $.ajax({
        method: 'get',
        url: `http://localhost:3000/seeHolidays`,
        success: (result) => {
            let html_append
            result.forEach(element => {
                html_append += 
                `<tr>
                    <td style="max-width: 200px;">${element.name}</td>
                    <td style="max-width: 400px;">${element.description}</td>
                    <td>${getDateFormat(new Date(element.date))}</td>
                </tr>`
            });
            console.log(html_append)
            $('#holiday-tbody').empty()
            $('#holiday-tbody').append(html_append)
        },
        error: (err) => {
            let err_msg = (Array.isArray(err.responseJSON))? err.responseJSON.message.join(' | '):err.responseJSON.message
            $('#err-body').empty()
            $('#err-body').append(err_msg)
            $('#errorHandlerModal').modal('show')
        }
    })
}

function editTodo(title, description, due_date, status, id){
    $.ajax({
        method: 'put',
        url: `http://localhost:3000/todos/${id}`,
        data: {
            title,
            description,
            due_date: new Date(due_date),
            status: (status == 'true')
        },
        headers:{
            token: localStorage.getItem('token')
        },
        success: (result) => {
            $('.box').hide()
            $('#editTodoModal').modal('hide')
            showTodos()
            $('#todo-box').show()
        },
        error: (err) => {
            let err_msg = (Array.isArray(err.responseJSON))? err.responseJSON.message.join(' | '):err.responseJSON.message
            $('#err-body').empty()
            $('#err-body').append(err_msg)
            $('#errorHandlerModal').modal('show')
        }
    })
}

function modalEditTrigger(id){
    $.ajax({
        method: 'get',
        url: `http://localhost:3000/todos/${id}`,
        headers:{
            token: localStorage.getItem('token')
        },
        success: (result) => {
            console.log(result)
            let html_append = 
            `<div id="editTodoId" class="form-group">
                <label for="recipient-name" class="col-form-label">ID</label>
                <input type="text" class="form-control" id="etId" value="${result.id}" readonly>
            </div>
            <div class="form-group">
                <label for="recipient-name" class="col-form-label">Todo</label>
                <input type="text" class="form-control" id="etTitle" value="${result.title}">
            </div>
            <div class="form-group">
                <label for="recipient-name" class="col-form-label">Description</label>
                <input type="text" class="form-control" id="etDescription" value="${result.description}">
            </div>
            <div class="form-group">
                <label for="recipient-name" class="col-form-label">Due Date</label>
                <input type="text" class="form-control" id="etDue_date" value="${result.due_date}">
            </div>
            <div class="form-group">
                <label for="recipient-name" class="col-form-label" style="text-align: left">Status: </label>
                <select id="etStatus">
                    ${(!result.status)?'<option value="false" selected>Unfinished</option><option value="true">Finished</option>':'<option value="false" >Unfinished</option><option value="true" selected>Finished</option>'}
                </select>
            </div>
            <button type="submit" class="btn btn-primary" id="editTodo-btn">Edit</button>`

            $('#editTodo-form').empty()
            $('#editTodo-form').append(html_append)
            $('#editTodoModal').modal('show')
        },
        error: (err) => {
            let err_msg = (Array.isArray(err.responseJSON))? err.responseJSON.message.join(' | '):err.responseJSON.message
            $('#err-body').empty()
            $('#err-body').append(err_msg)
            $('#errorHandlerModal').modal('show')
        }
    })
}

function fillQrModal(todo, iter){
    let html_append =
    `<div class="modal fade" id="qrcodeModal${iter}" tabindex="-1" role="dialog" aria-labelledby="qrcodeModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="qrcodeModalLabel">${todo.title}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="qrcode-body">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${todo.description}">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
    </div>`
    $('#qrcode-box').append(html_append)
}

function showTodos(){
    console.log('masuk')
    $.ajax({
        method: 'get',
        url: 'http://localhost:3000/todos',
        headers:{
            token: localStorage.getItem('token')
        },
        success: (data) => {
            let html_append_user_name = `${data.user.name}`
            let html_append_user_email = `${data.user.email}`
            $('#todo-box-user-name').empty()
            $('#todo-box-user-email').empty()
            $('#todo-box-user-name').append(html_append_user_name)
            $('#todo-box-user-email').append(html_append_user_email)

            let html_append = ''
            let iter = 1
            $('#qrcode-box').empty()
            data.todos.forEach(element => {
                html_append +=
                `<tr>
                    <td><a href="#" id="qrcode-modal-render" data-toggle="modal" data-target="#qrcodeModal${iter}">${element.title}</a></td>
                    <td>${element.description}</td>
                    <td>${getDateFormat(new Date(element.due_date))}</td>
                    <td>${(!element.status)?'unfinished':'finished'}</td>
                    <td> <button id="editTodo-btn" class="btn btn-primary" onclick="modalEditTrigger(${element.id})">Edit</button> <button id="delete-btn" class="btn btn-danger" onclick="deleteTodo(${element.id})">Delete</button> </td>
                </tr>`
                fillQrModal(element, iter)
                iter++
            })
            $('#addTodo-form')[0].reset()
            $('#todo-tbody').empty()
            $('#todo-tbody').append(html_append)
        },
        error: (err) => {
            let err_msg = (Array.isArray(err.responseJSON))? err.responseJSON.message.join(' | '):err.responseJSON.message
            $('#err-body').empty()
            $('#err-body').append(err_msg)
            $('#errorHandlerModal').modal('show')
        }
    })
}

function getDateFormat (date) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let dayName = days[date.getDay()]
    let dateFormat =
    `${dayName}, ${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`    
    return dateFormat
}

function login(email, password){
    $.ajax({
        method:'post',
        url: 'http://localhost:3000/users/login',
        data:{
            email,
            password
        },
        success: (data) => {
            console.log(data.token)
            localStorage.setItem('token', data.token)
            $('#login-render').hide()
            $('#register-render').hide()
            $('#logout-btn').show()
            $('#todo-btn').show()
            $('.box').hide()
            $('#login-form')[0].reset()
            showTodos()
            $('#todo-box').fadeIn()
        },
        error: (err) => {
            let err_msg = (Array.isArray(err.responseJSON))? err.responseJSON.message.join(' | '):err.responseJSON.message
            $('#err-body').empty()
            $('#err-body').append(err_msg)
            $('#errorHandlerModal').modal('show')
        }
    })
}

function register(name, email, password){
    $.ajax({
        method: 'post',
        url: 'http://localhost:3000/users/register',
        data:{
            name,
            email,
            password
        },
        success: (data) => {
            $('#login-render').hide()
            $('#register-render').hide()
            $('#logout-btn').show()
            localStorage.setItem('token', data.token)
            $('.box').hide()
            $('#register-form')[0].reset()
            showTodos()
            $('#todo-box').fadeIn()
        },
        error: (err) => {
            let err_msg = (Array.isArray(err.responseJSON))? err.responseJSON.message.join(' | '):err.responseJSON.message
            $('#err-body').empty()
            $('#err-body').append(err_msg)
            $('#errorHandlerModal').modal('show')
        }
    })
}

function createTodo(title, description, due_date){
    $.ajax({
        method: 'post',
        url: 'http://localhost:3000/todos',
        headers:{
            token: localStorage.getItem('token')
        },
        data:{
            title,
            description,
            due_date
        },
        success: (result) => {
            $('.box').hide()
            $('#addTodoModal').modal('hide')
            showTodos()
            $('#todo-box').show()
        },
        error: (err) => {
            let err_msg = (Array.isArray(err.responseJSON))? err.responseJSON.message.join(' | '):err.responseJSON.message
            $('#err-body').empty()
            $('#err-body').append(err_msg)
            $('#errorHandlerModal').modal('show')
        }
    })
}

function deleteTodo(id) {
    $.ajax({
        method: 'delete',
        url: `http://localhost:3000/todos/${id}`,
        headers:{
            token: localStorage.getItem('token')
        },
        success: (result) => {
            $('.box').hide()
            showTodos()
            $('#todo-box').show()
        },
        error: (err) => {
            let err_msg = (Array.isArray(err.responseJSON))? err.responseJSON.message.join(' | '):err.responseJSON.message
            $('#err-body').empty()
            $('#err-body').append(err_msg)
            $('#errorHandlerModal').modal('show')
        }
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}