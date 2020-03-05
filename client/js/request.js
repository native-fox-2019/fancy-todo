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
    }).fail(err => {
        console.log(err.responseJSON);
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
        console.log(err.responseJSON);
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
        console.log(err.responseJSON);
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
        console.log(err.responseJSON);
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
        console.log(err.responseJSON);
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
        console.log(err.responseJSON)
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
        console.log(err.responseJSON);
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
        setPage('todos');
        $('#logout').hide();
    }).fail(err => {
        console.log(err.responseJSON);
    });
}