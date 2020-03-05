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
        $('#login-form').hide()
        $('#todo').hide()
        $('#addTodo').hide()
        $('#editTodo').hide()
        $('#register-form').show()
    }
}


$('#continue-register').on('click', function() {
    start()
})

$('#continue-login').on('click', function() {
    $('#register-form').hide()
    $('#editTodo').hide()
    $('#addTodo').hide()
    $('#login-form').show()
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
        },
        error: (err) => {
            console.log(err)
        }
    })
})

function todo() {
    $('#register-form').hide()
    $('#login-form').hide()
    $('#addTodo').hide()
    $('#editTodo').hide()
    $('#todo').show()
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
                    <td><button onclick= "editTodo(${data.id})" class="btn btn-outline-info">Edit</button> <button onclick= "deleteTodo(${data.id})" class="btn btn-outline-danger">Delete</button></td>
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
    $('#editTodo').hide()
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
                todo()
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
    if (localStorage.getItem('token')) {
        $.ajax({
            method: "DELETE",
            url: `http://localhost:3000/todos/${id}`,
            headers: {
                token: `${localStorage.getItem('token')}`
            },
            success: () => {
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
        start()
    }
}

function editForm(data) {
    $('#register-form').hide()
    $('#login-form').hide()
    $('#todo').hide()
    $('#addTodo').hide()
    if (localStorage.getItem('token')) {
        $("#id-edit").val(data.id)
        $("#title-edit").val(data.title)
        $("#title-edit").val(data.title)
        $("#description-edit").val(data.description)
        $("#status-edit").val(data.status)
        $("#due_date-edit").val(data.due_date)     
        $('#editTodo').show()  
    } else {
        start()
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
                todo()
            },
            error: (err) => {
                console.log(err)
            }
        })
    } else {
        start()
    }
})

start()