
const url = 'http://localhost:3000'
const userUrl = 'http://localhost:3000/user'
const token = localStorage.getItem('token')
if (!token) {
    $('#login-page').show()
    $('#register-page').hide()
} else {
    getData()
    $('#main-page').show()
    $('#login-page').hide()
    $('#register-page').hide()
}

$('#register-anchor').click(function () {
    $('#login-page').hide()
    $('#register-page').show()
})

$('#login-anchor').click(function () {
    $('#login-page').show()
    $('#register-page').hide()
})

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
        .catch(err => {
            console.log(err)
        })
}

$("#register-page").on('submit', function (e) {
    e.preventDefault()
    register()
    $('#login-page').show()
    $('#register-page').hide()
})

function login() {
    $.ajax({
        url: `${userUrl}/login`,
        method: 'POST',
        data: {
            username: $('#username-login').val(),
            password: $('#password-login').val()
        }
    })
        .done(data => {
            console.log(data)
            localStorage.setItem('token', data.token)
            $('#username-login').val(''),
                $('#password-login').val('')

        })
        .catch(err => {
            console.log(err)
        })
}

$("#login-page").on("submit", function (e) {
    e.preventDefault()
    login()
    $('#login-page').hide()
    $('#main-page').show()
})

function getData() {
    $.ajax({
        url: `${url}/todos`,
        method: 'GET',
        headers: {
            token: token
        }
    })
        .done(data => {
            $('#main-page').empty()
            data.forEach((el, i) => {
                $('#main-page').append(`
                <tr>
                <td>${i + 1}</td>
                <td>${el.title}</td>
                <td>${el.description}</td>
                <td>${el.status}</td>
                <td>${el.due_date}</td>
                <td> <button type=”button” onClick="updateDataStatus(${el.id})">Done</button>||
                <button type="button" onClick="findDataToEdit(${el.id})">Edit</button>||
                <button type="button" onClick="deleteData(${el.id})">Delete</button></td>       
                </tr>
                `)

            });
        })
        .catch(err => {
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
        .catch(err => {
            console.log(err)
        })
}

$("#add-todos").on('submit', function (e) {
    e.preventDefault()
    $('#modal').modal('toggle');
    addData()
})


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
        .catch(err => {
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
        .catch(err => {
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
        .catch(err => {
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
        .catch(err => {
            console.log(err)
        })
}

function logout() {
    localStorage.removeItem('token')
    $('#username-login').val('')
    $('#password-login').val('')
    $('#login-page').show()
    $('#username-register').val(''),
        $('#email-register').val(''),
        $('#password-register').val('')
    $('#main-page').hide()
}

/*Modal */
$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget)
    var recipient = button.data('whatever')
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)
})
