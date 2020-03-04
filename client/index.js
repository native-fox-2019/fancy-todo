function register() {
    $('#register-form').hide()
}

function login() {
    $('#login-form').show()
}

function start() {
    if (localStorage.getItem('token')) {
        todo()
    } else {
        $('#register-form').show()
        $('#login-form').hide()
        $('#todo').hide()
        $('#addTodo').hide()
    }
}


$('#continue-register').on('click', function() {
    start()
})

$('#continue-login').on('click', function() {
    $('#register-form').hide()
    $('#login-form').show()
    $('#addTodo').hide()
})

$('#button-register').on('submit', function(event) {
    event.preventDefault()
    let $email = $('#email-register').val()
    let $password = $('#password-register').val()
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/user/register",
        data: {
            email: $email,
            password: $password
        },
        success: () => {
            register()
            login()
        },
        error: (err) => {
            console.log(err)
        }
    })
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
            console.log(token)
        },
        error: (err) => {
            console.log(err)
        }
    })
})

function todo() {
    $('#register-form').hide()
    $('#login-form').hide()
    $('#todo').show()
    $('#addTodo').hide()
    if (localStorage.getItem('token')) {
        $.ajax({
            method: "GET",
            url: "http://localhost:3000/todos",
            headers: {
                token: `${localStorage.getItem('token')}`
            },
            success: (data) => {
                $('#table-todo').empty()
                data.forEach(data => {
                    $('#table-todo').append(`<tr>
                    <td>${data.id}</td>
                    <td>${data.title}</td>
                    <td>${data.description}</td>
                    <td>${data.status}</td>
                    <td>${data.due_date}</td>
                    <td><button onclick= "deleteTodo(${data.id})" class="btn btn-outline-danger">Delete</button></td>
                    </tr>`)
                })
            }
        })
    } else {
        start()
    }
}

$('#add-form').on('click', function(event) {
    $('#register-form').hide()
    $('#login-form').hide()
    $('#todo').hide()
    $('#addTodo').show()
})

$('#add-button').on('submit', function(event) {
    event.preventDefault()
    let $title = $('#title-add').val()
    let $description = $('#description-add').val()
    let $status = $('#status-add').val()
    let $due_date = $('#due_date-add').val()
    console.log($title, $description, $status, $due_date)
    if (localStorage.getItem('token')) {
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/todos",
            data: {
                title : $title,
                description : $description,
                status : $status,
                due_date : $due_date
            },
            headers: {
                token: `${localStorage.getItem('token')}`
            },
            success: (data) => {
                todo()
                console.log(data)
            },
            error: (err) => {
                console.log(err)
            }
        })
    } else {
        start()
    }
})

function deleteTodo(id) {
    console.log('delete')
    if (localStorage.getItem('token')) {
        $.ajax({
            method: "DELETE",
            url: `http://localhost:3000/todos/${id}`,
            headers: {
                token: `${localStorage.getItem('token')}`
            },
            success: (token) => {
                todo()
            },
            error: (err) => {
                console.log(err)
            }
        })
    } else {
        start()
    }
}

start()