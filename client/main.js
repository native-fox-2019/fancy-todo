"use strict"
const url = 'http://localhost:3000'
const userUrl = 'http://localhost:3000/user'
const token = localStorage.getItem('token')

function login() {

    $.ajax({
        url: `${userUrl}/login`,
        method: 'POST',
        data: {
            username: $('#email-login').val(),
            password: $('#password-login').val()
        }
    })
        .done(data => {
            localStorage.setItem('token', data.token)
            $('#email-login').val(''),
                $('#password-login').val('')
            $('#login-page').hide()
            $('#main-page').show()

        })
        .fail(err => {
            console.log(err)
            // swal({
            //     title: "S",
            //     text: "Here's a custom image.",
            //     imageUrl: 'thumbs-up.jpg'
            //   });
        })
}

/*registe manual*/
function register() {
    $.ajax({
        url: `${userUrl}/register`,
        method: 'POST',
        data: {
            username: $('#username-register').val(),
            email: $('#email-register').val(),
            password: $('#password-register').val()
        }
    })
        .done(data => {
            $('#username-register').val(''),
                $('#email-register').val(''),
                $('#password-register').val('')
        })
        .fail(err => {
            console.log(err)
        })
}

/*Google OAuth */
function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: `${userUrl}/googleLogin`,
        method: 'POST',
        data: {
            token: id_token
        }
    })
        .done(data => {
            localStorage.setItem('token', data.token)
            $('#main-page').show()
            $('#login-page').hide()

        })
        .fail(err => {
            console.log(err)

        })
}

function getData() {
    $.ajax({
        url: `${url}/todos`,
        method: 'GET',
        headers: {
            token: token
        }
    })
        .done(data => {
            $('#data-Todos').empty()
            if (data.length === 0) {
                $('#data-Todos').append(`
           
                <tr class="text-center" style="text-align:center;">
                    <td colspan="6"> NO DATA </td>
                </tr>
          
            `)
            } else {
                data.forEach((el, i) => {
                    $('#data-Todos').append(`
                <tr>
                <td class="text-left">${i + 1}</td>
                <td class="text-left">${el.title}</td>
                <td class="text-left">${el.description}</td>
                <td class="text-left">${el.due_date}</td>
                <td class="text-center">${el.status}</td>
                <td class="text-center">
                <a href="#" style="align-items: center;"><button
                style=" background-color: rgb(99, 194, 209); color: white; align-items: center;" onClick="updateDataStatus(${el.id})">Done</button></a>
                ||
                <a href="#" style="align-items: center;"><button
                style=" background-color: rgb(99, 194, 209); color: yellow; align-items: center;" onClick="findDataToEdit(${el.id})">Edit</button></a>
                ||
                <a href="#" style="align-items: center;"><button
                    style=" background-color: rgb(99, 194, 209); color: red; align-items: center;" onClick="deleteData(${el.id})">Delete</button></a>
                </td>
                </tr>
                `)

                });
            }

        })
        .fail(err => {
            console.log(err)
        })
}

function addData() {
    $.ajax({
        url: `${url}/todos`,
        method: 'POST',
        headers: {
            token: token
        },
        data: {
            title: $("#title").val(),
            description: $("#description").val(),
            due_date: $("#due_date").val()
        }
    })
        .done(data => {
            $("#title").val(''),
                $("#description").val(''),
                $("#due_date").val('')
            getData()
        })
        .fail(err => {
            console.log(err)
        })
}

function findDataToEdit(id) {
    $.ajax({
        url: `${url}/todos/${id}`,
        method: 'GET',
        headers: {
            token: token
        }
    })
        .done(data => {

            $('#edit-todo').empty()
            $('#edit-todo').append(`
            <div class="modal-header mt-3 ml-4 mr-4">
            <h4 class="container text-center">EDIT TODO</h4>
            </div>
            <form class="ml-4 mr-4">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="title" class="form-control" id="title-edit" value="${data.title}">
            </div>
            <div class="form-group">
                <label for="exampleFormControlInput1">Description</label>
                <input type="description" class="form-control" id="description-edit" value="${data.description}">
            </div>
            <div class="form-group">
                <label for="exampleFormControlInput1">Due Date</label>
                <input type="date" class="form-control" id="due_date-edit" value="${data.due_date}">
            </div>
            <div class="container text-right mb-3">
                <button type="button" class="btn btn-primary" onClick="updateData(${data.id})">Edit List</button>
            </div>
        </form>
            `)
        })
        .fail(err => {
            console.log(err)
        })

}

function updateData(id) {
    $.ajax({
        url: `${url}/todos/${id}`,
        method: 'PUT',
        headers: {
            token: token
        },
        data: {
            title: $("#title-edit").val(),
            description: $("#description-edit").val(),
            due_date: $("#due_date-edit").val()
        }
    })
        .done(data => {
            $("#title-edit").val(''),
                $("#description-edit").val(''),
                $("#due_date-edit").val('')

            getData()
        })
        .fail(err => {
            console.log(err)
        })
}

function updateDataStatus(id) {
    $.ajax({
        url: `${url}/todos/${id}`,
        method: 'PATCH',
        headers: {
            token: token
        },
        data: {
            status: 'completed'
        }
    })
        .done(data => {
            getData()
        })
        .fail(err => {
            console.log(err)

        })
}

function deleteData(id) {
    $.ajax({
        url: `${url}/todos/${id}`,
        method: 'DELETE',
        headers: {
            token: token
        }
    })
        .done(data => {
            getData()
        })
        .fail(err => {
            console.log(err)
        })
}

function logout() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    localStorage.removeItem('token')
    $('#username-login').val('')
    $('#password-login').val('')
    $('#login-page').show()
    $('#username-register').val(''),
        $('#email-register').val(''),
        $('#password-register').val('')
    $('#main-page').hide()

}



/* check token*/
$(document).ready(function () {
    if (!token) {
        $('#login-page').show()
        $('#register-page').hide()
    } else {
        getData()
        $('#main-page').show()
        $('#login-page').hide()
        $('#register-page').hide()
    }

    /* register */
    $('#register-anchor').click(function () {
        $('#login-page').hide()
        $('#register-page').show()
    })

    /* button */
    $('#login-anchor').click(function () {
        $('#login-page').show()
        $('#register-page').hide()
    })

    /* button register */
    $("#register-page").on('submit', function (e) {
        e.preventDefault()
        $('#login-page').show()
        $('#register-page').hide()
        register()
    })


    /* button login */
    $("#login-page").on("submit", function (e) {
        e.preventDefault()
        login()
    })

    /*button modal*/
    $("#add-todos").on('submit', function (e) {
        e.preventDefault()
        $('#modal').modal('toggle');
        addData()
    })

    $("#edit-todo").click(function (e) {
        e.preventDefault()
        $('#edit-todo').show()
        $('#main-page').hide()
    })

    /*Modal form*/
    $('#exampleModal').on('show.bs.modal', function (e) {
        var button = $(e.relatedTarget)
        var recipient = button.data('whatever')
        var modal = $(this)
        modal.find('.modal-title').text('New message to ' + recipient)
        modal.find('.modal-body input').val(recipient)
    })
})
