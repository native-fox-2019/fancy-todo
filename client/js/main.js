$(document).ready(() => {
    if (localStorage.getItem('token')) {
        setPage('todos');
    } else {
        setPage('login');
    }

    $('#register-link').on('click', () => {
        setPage('register');
    });

    $('#login-link').on('click', () => {
        setPage('login');
    });
    $('#logout-user').on('click', () => {
        localStorage.removeItem('token');
        setPage('login');
    });

    $('#login-button').on('submit', (event) => {
        event.preventDefault();
        let email = $('#email-login').val();
        let password = $('#password-login').val();
        let obj = {
            email,
            password
        }
        loginUser(obj);
    });

    $('#register-button').on('submit', (event) => {
        event.preventDefault();
        let username = $('#username-register').val();
        let email = $('#email-register').val();
        let password = $('#password-register').val();
        let obj = {
            username,
            email,
            password
        }
        registerUser(obj);
    });

    $('#form-create').on('submit', (event) => {
        event.preventDefault();
        let title = $('#todo-title').val();
        let description = $('#todo-description').val();
        let due_date = $('#todo-due-date').val();
        let obj = {
            title,
            description,
            due_date
        }
        createNewTodos(obj);
    });

    $('#form-edit').on('submit', (event) => {
        event.preventDefault();
        let title = $('#edit-todo-title').val();
        let description = $('#edit-todo-description').val();
        let due_date = $('#edit-todo-due-date').val();
        let status = null;
        if ($('#edit-todo-status').val() === 'true') {
            status = true;
        } else {
            status = false;
        }
        let id = $('#submit-edit').val();
        let obj = {
            title,
            description,
            status,
            due_date
        }
        editTodoData(obj, id);
    });
})

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
    });
    setPage('login');
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    let obj = {
        token: id_token
    }
    googleVerify(obj);
}