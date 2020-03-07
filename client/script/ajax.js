
function showLogin() {
    $("#add-page").hide(300)
    $("#register-page").hide(300)
    $("#main-page").hide(300)
    $("#edit-page").hide(300)
    $("#edit-profile-page").hide(300)
    $("#login-page").show(300)
}

function showRegister() {
    $("#add-page").hide(300)
    $("#main-page").hide(300)
    $("#edit-page").hide(300)
    $("#login-page").hide(300)
    $("#edit-profile-page").hide(300)
    $("#register-page").show(300)
}

function showEdit() {
    $("#add-page").hide(300)
    $("#register-page").hide(300)
    $("#main-page").hide(300)
    $("#login-page").hide(300)
    $("#edit-page").show(300)
    $("#edit-profile-page").hide(300)
}

function showAdd() {
    $("#add-page").show(300)
    $("#register-page").hide(300)
    $("#main-page").hide(300)
    $("#edit-page").hide(300)
    $("#login-page").hide(300)
    $("#edit-profile-page").hide(300)
}

function showMain() {
    $("#add-page").hide(300)
    $("#register-page").hide(300)
    $("#main-page").show(300)
    $("#edit-page").hide(300)
    $("#login-page").hide(300)
    $("#edit-profile-page").hide(300)
    getData()
}

function showEditProfile() {
    $("#add-page").hide(300)
    $("#register-page").hide(300)
    $("#main-page").hide(300)
    $("#edit-page").hide(300)
    $("#login-page").hide(300)
    $("#edit-profile-page").show(300)
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
            'username': $('#login-username').val(),
            'password': $('#login-password').val()
        },
        success: (data) => {
            localStorage.setItem('token', data)
            getData()
            showMain()
        }
    });
}

function showEditProfile(){
    $.ajax({
        url: 'http://localhost:3000/users',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        success: (data) => {
            showEditProfile()
            $('#name-profile').val(data.name)
            $('#email-profile').val(data.email)
            $('#password-profile').val(data.password)
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
            showMain()
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
            showEdit()
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
            showMain()
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
            showMain()
        },
        error: (err) => {
            console.log(err)
        }

    })
}