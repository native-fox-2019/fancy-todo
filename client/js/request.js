const endpoint = `http://localhost:3000/`

function loginUser(obj) {
    $.ajax({
        method: `POST`,
        url: `${endpoint}users/login`,
        data: JSON.stringify(obj),
        contentType: `application/json`,
        success: (data) => {
            localStorage.setItem("token", data.token);
            setPage('todos');
        },
        error: (err) => {
            console.log(err.responseJSON);
        }
    })
}

function registerUser(obj) {
    $.ajax({
        method: `POST`,
        url: `${endpoint}users/register`,
        data: JSON.stringify(obj),
        contentType: `application/json`,
        success: () => {
            setPage('login');
        },
        error: (err) => {
            console.log(err.responseJSON);
        }
    })
}

function getUserTodos() {
    $.ajax({
        method: 'GET',
        url: `${endpoint}todos`,
        headers: {
            token: `${localStorage.getItem('token')}`
        },
        success: (data) => {
            setAllTodos(data);
        },
        error: (err) => {
            console.log(err.responseJSON);
        }
    })
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
        console.log(err);
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
        console.log(err);
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
        console.log(err)
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
        console.log(err);
    });
}