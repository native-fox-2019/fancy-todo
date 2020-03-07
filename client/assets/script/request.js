// login / register
function registerSubmit(data) {
    $.ajax({
        url: `http://localhost:3000/users/register`,
        type: `POST`,
        data
    })
        .done(data => {
            localStorage.setItem(`Token`, data.token)
            show(`list`)
        })
        .fail(err => {
            fail(err.responseJSON)
        })
}

function loginSubmit(data) {
    $.ajax({
        url: `http://localhost:3000/users/login`,
        type: `POST`,
        data
    })
        .done(data => {
            localStorage.setItem(`Token`, data.token)
            show(`list`)
        })
        .fail(err => {
            fail(err.responseJSON)
        })
}

// Todo
function getTodo(token){
    $.ajax({
        url: `http://localhost:3000/todos`,
        type: `GET`,
        headers: {
            token
        }
    })
        .done(data => {
            listData(data)
        })
        .fail(err => {
            fail(err.responseJSON)
        })
}

function addTodo(data, token){
    $.ajax({
        url: `http://localhost:3000/todos`,
        type: `POST`,
        headers: {
            token
        },
        data
    })
        .done(data => {
            getTodo(token)
        })
        .fail(err => {
            fail(err.responseJSON)
        })
}

function editTodo(data, token) {
    $.ajax({
        url: `http://localhost:3000/todos/${data.id}`,
        type: `PUT`,
        headers: {
            token
        },
        data
    })
        .done(data => {
            getTodo(token)
        })
        .fail(err => {
            fail(err.responseJSON)
        })
}

function deleteTodo(id, token) {
    $.ajax({
        url: `http://localhost:3000/todos/${id}`,
        type: `DELETE`,
        headers: {
            token
        }
    })
}