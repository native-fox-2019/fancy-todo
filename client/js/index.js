$('#register-link').on('click', () => {
    registerlink();
});

$('#login-link').on('click', () => {
    loginlink();
});
$('#logout-user').on('click', () => {
    localStorage.removeItem('token');
    loginlink();
});

$('#login-form').on('submit', (event) => {
    event.preventDefault();
    let email = $('#email-login').val();
    let password = $('#password-login').val();
    let obj = {
        email,
        password
    }
    $.ajax({
        method: `POST`,
        url: `http://localhost:3000/users/login`,
        data: JSON.stringify(obj),
        contentType: `application/json`,
        success: (data) => {
            localStorage.setItem("token", data.token);
            showTodos();
        },
        error: () => {
            console.log('error');
        }
    })
});

$('#register-form').on('submit', (event) => {
    event.preventDefault();
    let username = $('#username-register').val();
    let email = $('#email-register').val();
    let password = $('#password-register').val();
    let obj = {
        username,
        email,
        password
    }
    $.ajax({
        method: `POST`,
        url: `http://localhost:3000/users/register`,
        data: JSON.stringify(obj),
        contentType: `application/json`,
        success: () => {
            loginlink();
        },
        error: () => {
            console.log('errorr');
        }
    })
});
