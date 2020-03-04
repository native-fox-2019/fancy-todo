function register() {
    $('#register-form').hide()
}

function login() {
    $('#login-form').show()
}

function start() {
    $('#register-form').show()
    $('#login-form').hide()
    $('#todo').hide()
    localStorage.clear()
}


$('#continue-register').on('click', function() {
    start()
})

$('#continue-login').on('click', function() {
    $('#register-form').hide()
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
    if (localStorage.getItem('token')) {
        $.ajax({
            method: "GET",
            url: "http://localhost:3000/todos",
            headers : {
                token : `${localStorage.getItem('token')}`
            },
            success: (data) => {
                data.forEach( x => {
                    $('#table-todo').append(`<tr>
                                          <td>${x.title}</td>
                                          <td>${x.description}</td>
                                          <td>${x.status}</td>
                                          <td>${x.due_date}</td>
                                          <td><button>Delete</button></td>
                                      </tr>`)  
                })
            }
        })
    } else {
        start()
    }
}

start()