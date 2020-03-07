
function showLogin(params) {
    $("#add-page").hide(params)
    $("#register-page").hide(params)
    $("#main-page").hide(params)
    $("#edit-page").hide(params)
    $("#edit-profile-page").hide(params)
    $("#login-page").show(params)
}

function showRegister(params) {
    $("#add-page").hide(params)
    $("#main-page").hide(params)
    $("#edit-page").hide(params)
    $("#login-page").hide(params)
    $("#edit-profile-page").hide(params)
    $("#register-page").show(params)
}

function showEdit(params) {
    $("#add-page").hide(params)
    $("#register-page").hide(params)
    $("#main-page").hide(params)
    $("#login-page").hide(params)
    $("#edit-page").show(params)
    $("#edit-profile-page").hide(params)
}

function showAdd(params) {
    $("#add-page").show(params)
    $("#register-page").hide(params)
    $("#main-page").hide(params)
    $("#edit-page").hide(params)
    $("#login-page").hide(params)
    $("#edit-profile-page").hide(params)
}

function showMain(params) {
    $("#add-page").hide(params)
    $("#register-page").hide(params)
    $("#main-page").show(params)
    $("#edit-page").hide(params)
    $("#login-page").hide(params)
    $("#edit-profile-page").hide(params)
    getData(params)
}

function showEditProfile(params) {
    $("#add-page").hide(params)
    $("#register-page").hide(params)
    $("#main-page").hide(params)
    $("#edit-page").hide(params)
    $("#login-page").hide(params)
    $("#edit-profile-page").show(params)
}

function register() {
    event.preventDefault()
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
            'email': $('#login-email').val(),
            'password': $('#login-password').val()
        },
        success: (data) => {
            localStorage.setItem('token', data)
            showMain(0)
        }
    });
}

function showProfile(){
    $.ajax({
        url: 'http://localhost:3000/users',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        success: (data) => {
            $('#name-profile').val(data.name)
            $('#email-profile').val(data.email)
            $('#password-profile').val(data.password)
            showEditProfile(300)
        },
        error: (err) => console.log(err)
    })
}

function editProfile(){
    $.ajax({
        url: 'http://localhost:3000/users',
        method: 'put',
        headers: {
            'token': localStorage.getItem('token')
        },
        data:{
            "name":$('#profile-name').val(),
            "email":$('#profile-email').val(),
            "password":$('#profile-password').val()
        },
        success: (data) => {
            showMain(300)
        },
        error: (err) => console.log(err)
    })
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
                <td><button class="btn btn-primary" onclick="getOne(${el.id})" id="update-button">Edit</button>
                <button class="btn btn-primary" id="delete-button" onclick="deleteData(${el.id})">Delete</button></td>
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
            showEdit(300)
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
            event.preventDefault()
           showMain(300)
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
            showMain(0)
        },
        error :(err)=>{
            console.log(err)
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
            event.preventDefault()
            showMain(300)
        },
        error: (err) => {
            console.log(err)
        }
    })
}