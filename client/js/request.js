const endpoint = `http://localhost:3000/`

function loginUser(obj) {
    $.ajax({
        method: `POST`,
        url: `${endpoint}users/login`,
        data: JSON.stringify(obj),
        contentType: `application/json`
    })
    .done(data => {
        localStorage.setItem("token", data.token);
        setPage('todos');
        $('#sign-out-google').hide();
        loginModal();
    }).fail(err => {
        errorMessage(err.responseJSON.message);
    });
}

function registerUser(obj) {
    $.ajax({
        method: `POST`,
        url: `${endpoint}users/register`,
        data: JSON.stringify(obj),
        contentType: `application/json`
    })
    .done(() => {
        setPage('login');
    }).fail(err => {
        errorMessage(err.responseJSON.message);
    });
}

function getUserTodos() {
    $.ajax({
        method: 'GET',
        url: `${endpoint}todos`,
        headers: {
            token: `${localStorage.getItem('token')}`
        }
    })
    .done(data => {
        setAllTodos(data);
    }).fail(err => {
        errorMessage(err.responseJSON.message);
    });
}

function deleteTodo(id) {
    $.ajax({
        method: 'delete',
        url: `${endpoint}todos/${id}`,
        headers: {
            token: `${localStorage.getItem('token')}`
        }
    })
    .done(() => {
        showTodos();
    }).fail(err => {
        errorMessage(err.responseJSON.message);
    })
}

function createNewTodos(obj) {
    $.ajax({
        method: 'POST',
        url: `${endpoint}todos`,
        headers: {
            token: `${localStorage.getItem('token')}`
        },
        data: JSON.stringify(obj),
        contentType: `application/json`
    })
    .done(() => {
        showTodos();
    }).fail(err => {
        errorMessage(err.responseJSON.message);
    });
}

function editTodo(id) {
    $.ajax({
        method: 'GET',
        url: `${endpoint}todos/${id}`,
        headers: {
            token: `${localStorage.getItem('token')}`
        }
    })
    .done((data) => {
        editForm(data);
    }).fail(err => {
        errorMessage(err.responseJSON.message);
    });
}

function editTodoData(obj, id) {
    $.ajax({
        method: 'PUT',
        url: `${endpoint}todos/${id}`,
        headers: {
            token: `${localStorage.getItem('token')}`
        },
        data: JSON.stringify(obj),
        contentType: `application/json`
    })
    .done(() => {
        setPage('todos');
    }).fail(err => {
        errorMessage(err.responseJSON.message);
    });
}

function googleVerify(obj) {
    $.ajax({
        method: 'POST',
        url: `${endpoint}googlelogin`,
        data: JSON.stringify(obj),
        contentType: `application/json`
    })
    .done((data) => {
        localStorage.setItem("token", data.token);
        setPage('todos-google');
    }).fail(err => {
        errorMessage(err.responseJSON.message);
    });
}