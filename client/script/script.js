function register() {
    $.ajax({
        url: 'http://localhost:3000/users/register',
        method: 'post',
        data: {
            'name': $('#register-username').val(),
            'email': $('#register-email').val(),
            'password': $('#register-password').val()
        },
        success: (data) => {
            login()
        }
    })
}


function login() {
    event.preventDefault();
    $.ajax({
        url: 'http://localhost:3000/users/login',
        method: 'post',
        data: {
            'username': $('#login-username').val(),
            'password': $('#login-password').val()
        },
        success: (data) => {
            localStorage.setItem('token', data)
            getData()
            $("#main-page").show()
            $('#login-page').hide()
        }
    });
}

function getData() {
    $.ajax({
        url: 'http://localhost:3000/todos',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        success: (data) => {
            $('#todos-data').empty()
            data.forEach((el, index) => {
                $('#todos-data').append(`<tr id="todos-row">
                <td>${index + 1}</td>
                <td>${el.title}</td>
                <td>${el.description}</td>
                <td><input type="checkbox" id="data-title" ${el.status === 'done' ? 'checked' : ''}></input></td>
                <td>${el.due_date.substring(0, 10)}</td>
                <td><button id="edit-button" onclick="getOne(${el.id})" >Edit</button>
                <button id="delete-button" onclick="deleteData(${el.id})">Delete</button></td>
                </tr>`)
            });
        },
        error: (err) => console.log(err)
    })
}

function getOne(id) {
    $.ajax({
        url: 'http://localhost:3000/todos/' + id,
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        success: (data) => {
            console.log('ihiw')
            $('#main-page').hide()
            $('#edit-page').show()
            $('#edit-title').val(data.title)
            $('#edit-description').val(data.description)
            $('#edit-status select').val(data.status)
            let newDate = new Date(data.due_date)
            $('#edit-due_date').val(newDate.toISOString().split('T')[0])
            $('#rahasia').val(data.id)
        },
        error: (err) => console.log(err)
    })
}

function addData() {
    $.ajax({
        url: 'http://localhost:3000/todos',
        method: 'post',
        headers: {
            'token': localStorage.getItem('token')
        },
        data: {
            title: $('#add-title').val(),
            description: $('#add-description').val(),
            status: $('#add-status').val(),
            due_date: $('#add-due_date').val()
        },
        success: (data) => {
            $('#add-page').hide()
            reload()
            $('#main-page').show()
        },
        error: (err) => {
            console.log(err)
        }
    })
}

function deleteData(id) {
    $.ajax({
        url: "http://localhost:3000/todos/" + id,
        method: "delete",
        headers: {
            'token': localStorage.getItem('token')
        },
        success: (data) => {
            getData()
        }
    })
}

function updateData() {
    let id = $('#rahasia').val()
    $.ajax({
        url: "http://localhost:3000/todos/" + id,
        method: 'put',
        headers: {
            'token': localStorage.getItem('token')
        },
        data: {
            "title": $('#edit-title').val(),
            "description": $('#edit-description').val(),
            "status": $('#edit-status').val(),
            "due_date": $('#edit-due_date').val()
        },
        success: (data) => {
            console.log('data succesfully updated')
            $('#main-page').show()
            getData()
        },
        error: (err) => {
            console.log(err)
        }

    })
}

function reload() {
    $('#todos-data').empty()
    getData()
}

$('#edit').on('submit', (event) => {
    event.preventDefault()
    updateData()
})

$('#register-button').on('click', () => {
    $("#register-page").show()
    $("#login-page").hide()
    $("#edit-page").hide()
    $("#main-page").hide()
})

$('#add-todos').on('click', (event) => {
    $('#main-page').hide()
    $('#add-page').show()
})

if (localStorage.token) {
    $("#register-page").hide()
    $("#login-page").hide()
    $("#main-page").show()
    $("#edit-page").hide()
    $("#add-page").hide()
    getData()
} else {
    $("#add-page").hide()
    $("#register-page").hide()
    $("#main-page").hide()
    $("#edit-page").hide()
    $("#login-page").show()
}