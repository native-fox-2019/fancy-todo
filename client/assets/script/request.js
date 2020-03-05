function registerSubmit(data) {
    $.ajax({
        url: `http://localhost:3000/users/register`,
        type: `POST`,
        data
    })
        .done(data => {
            show(`login`)
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

function getTodo(){
    $.ajax({
        url: `http://localhost:3000/todos`,
        type: `GET`,
        headers: {
            token: localStorage.getItem(`Token`)
        }
    })
        .done(data => {
            listData(data.responseJSON)
        })
        .fail(err => {
            fail(err.responseJSON)
        })
}