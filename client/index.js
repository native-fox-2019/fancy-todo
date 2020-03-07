$(document).ready(()=>{
    if(localStorage.getItem('token')){
        startTrue()
    } else {
        startFalse()
    }
})

function startTrue(){
    $('#register-form').hide()
    $('#login-form').hide()
    $('#addTodo').hide()
    $('#editTodo').hide()
    $('#button-logout').show()
    $('#calendar').show()
    $('#todo').show()
    showTodo()
    calendarific()
}

function startFalse(){
    $('#button-logout').hide()
    $('#todo').hide()
    $('#addTodo').hide()
    $('#editTodo').hide()
    $('#register-form').hide()
    $('#calendar').hide()
    $('#login-form').show()
}

function register(){
    $('#button-logout').hide()
    $('#todo').hide()
    $('#addTodo').hide()
    $('#editTodo').hide()
    $('#login-form').hide()
    $('#calendar').hide()
    $('#register-form').show()
}

$('#continue-register').on('click', function() {
    register()
})

$('#continue-login').on('click', function() {
    $('#register-form').hide()
    $('#editTodo').hide()
    $('#addTodo').hide()
    $('#calendar').hide()
    $('#login-form').show() 
})

$('#button-register').on('submit', function(event) {
    event.preventDefault()
    let $email = $('#email-register').val()
    let $password = $('#password-register').val()
    let $confirmPassword = $('#confirm-password-register').val()
    if($password === $confirmPassword){
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/user/register",
            data: {
                email: $email,
                password: $password
            },
            success: (token) => {
                localStorage.setItem('token', token)
                todo()
            },
            error: (err) => {
                console.log(err)
            }
        })
    } else {
        register()
    }
    $('#button-register')[0].reset()
})

$('#button-login').on('submit', function(event) {
    event.preventDefault()
    let $email = $('#email-login').val()
    let $password = $('#password-login').val()
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/user/login",
        data: {
            email: $email,
            password: $password
        },
        success: (token) => {
            localStorage.setItem('token', token)
            todo()
        },
        error: (err) => {
            console.log('wrong password/username')
            console.log(err)
        }
    })
    $('#button-login')[0].reset()
})

function calendarific(){
    $('#calendarific').empty()
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/calendar',
        success : (data)=>{
            for(let i = 0; i<data.length; i++){
                $('#calendarific').append(`
                <tr>
                <td>${data[i].name}<td>
                <td>${data[i].date.iso}<td>
                </tr>
                `)
            }
        },
        error : (err) =>{
            console.log(err)
        }
    })
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/user/googleSignIn',
        data: {
            token : id_token
        },
        success : (token)=>{
            localStorage.setItem('token', token)
            startTrue()
        },
        error : (err)=>{
            console.log(err)
        }
    })
}

function showTodo(){
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/todos",
        headers: {
            token: `${localStorage.getItem('token')}`
        },
        success: (data) => {
            $('#table-todo').empty()
            let x = 1
            data.forEach(data => {
                $('#table-todo').append(`<tr>
                <td>${x}</td>
                <td>${data.title}</td>
                <td>${data.description}</td>
                <td>${data.status}</td>
                <td>${data.due_date}</td>
                <td><button onclick= "editTodo(${data.id})" class="btn btn-outline-info">Edit</button> <button onclick= "deleteTodo(${data.id})" class="btn btn-outline-danger">Delete</button></td>
                </tr>`)
                x++
            })
        },
        error : (err)=>{
            console.log(err)
        }
    })
}

$('#add-form').on('click', function() {
    $('#register-form').hide()
    $('#login-form').hide()
    $('#todo').hide()
    $('#editTodo').hide()
    $('#button-logout').hide()
    $('#calendar').hide()
    $('#addTodo').show()
})

$('#add-button').on('submit', function(event) {
    event.preventDefault()
    let $title = $('#title-add').val()
    let $description = $('#description-add').val()
    let $status = $('#status-add').val()
    let $due_date = $('#due_date-add').val()
    if (localStorage.getItem('token')) {
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/todos",
            data: {
                title: $title,
                description: $description,
                status: $status,
                due_date: $due_date
            },
            headers: {
                token: `${localStorage.getItem('token')}`
            },
            success: (data) => {
                $('#add-button')[0].reset()
                startTrue()
            },
            error: (err) => {
                console.log(err)
            }
        })
    } else {
        signOut()
    }
})

function deleteTodo(id) {
    if (localStorage.getItem('token')) {
        $.ajax({
            method: "DELETE",
            url: `http://localhost:3000/todos/${id}`,
            headers: {
                token: `${localStorage.getItem('token')}`
            },
            success: () => {
                startTrue()
            },
            error: (err) => {
                console.log(err)
            }
        })
    } else {
        signOut()
    }
}

function editTodo(id) {
    if (localStorage.getItem('token')) {
        $.ajax({
            method: "GET",
            url: `http://localhost:3000/todos/${id}`,
            headers: {
                token: `${localStorage.getItem('token')}`
            },
            success: (data) => {
                editForm(data)
            },
            error: (err) => {
                console.log(err)
            }
        })
    } else {
        signOut()
    }
}

function editForm(data) {
    $('#register-form').hide()
    $('#login-form').hide()
    $('#todo').hide()
    $('#addTodo').hide()
    $('#calendar').hide()
    $('#button-logout').hide()
    if (localStorage.getItem('token')) {
        $("#id-edit").val(data.id)
        $("#title-edit").val(data.title)
        $("#title-edit").val(data.title)
        $("#description-edit").val(data.description)
        $("#status-edit").val(data.status)
        $("#due_date-edit").val(data.due_date)     
        $('#editTodo').show()  
    } else {
        signOut()
    }
}

$('#edit-button').on('submit', function(event) {
    event.preventDefault()
    let $id = $('#id-edit').val()
    let $title = $('#title-edit').val()
    let $description = $('#description-edit').val()
    let $status = $('#status-edit').val()
    let $due_date = $('#due_date-edit').val()
    if (localStorage.getItem('token')) {
        $.ajax({
            method: "PUT",
            url: `http://localhost:3000/todos/${$id}`,
            data: {
                title: $title,
                description: $description,
                status: $status,
                due_date: $due_date
            },
            headers: {
                token: `${localStorage.getItem('token')}`
            },
            success: () => {
                startTrue()
            },
            error: (err) => {
                console.log(err)
            }
        })
    } else {
        signOut()
    }
})

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    localStorage.removeItem('token')
    startFalse()
  }