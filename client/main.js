"use strict"
const url = 'http://localhost:3000'
const userUrl = 'http://localhost:3000/user'
let token = localStorage.getItem('token')

/*function hemdle error*/
function error(obj) {
    let errStr = ``
    if (obj.length <= 1) {
        errStr += `${obj[0]}`
    } else {
        obj.forEach(el => {
            errStr += `${el} \n`

        })
    }

    return errStr
}

function login() {
    $.ajax({
        url: `${userUrl}/login`,
        method: 'POST',
        data: {
            email: $('#email-login').val(),
            password: $('#password-login').val()
        }
    })
        .done(data => {
           
            localStorage.setItem('token', data.token)
            token = localStorage.getItem('token')
            getData()
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Login succes!',
                showConfirmButton: false,
                timer: 1500
            })
            
        })
        .fail(err => {
            $('#navbar').hide()
            $('#main-page').hide()
            $('#login-page').show()
            $('#register-page').hide()
            $('#edit-page').hide()
            $('#footer').hide()
            swal({
                title: "Something Wrong",
                text: 'email or password wrong!',
                icon: "warning"
            });
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
            $('#navbar').hide()
            $('#main-page').hide()
            $('#login-page').show()
            $('#register-page').hide()
            $('#edit-page').hide()
            $('#footer').hide()
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `You are really close to login`,
                showConfirmButton: false,
                timer: 1500
            })
        })
        .fail(err => {
            $('#username-register').val(''),
            $('#email-register').val(''),
            $('#password-register').val(''),
            $('#navbar').hide()
            $('#main-page').hide()
            $('#login-page').hide()
            $('#register-page').show()
            $('#edit-page').hide()
            $('#footer').hide()
            if (error(err.responseJSON.message) === '* Validation error') {
                swal({
                    title: "Something Wrong",
                    text: 'username / email have used by other user. try onother one!',
                    icon: "warning"
                });
            } else {
                swal({
                    title: "Something Wrong",
                    text: error(err.responseJSON.message),
                    icon: "warning"
                });
            }
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
            token = localStorage.getItem('token')
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Login Success`,
                showConfirmButton: false,
                timer: 1500
            })
            getData()
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
            $('#navbar').show()
            $('#main-page').show()
            $('#data-Todos').show()
            $('#footer').show()
            $('#login-page').hide()
            $('#register-page').hide()
            $('#edit-page').hide()

            if (data.length === 0) {
                $('#data-Todos').append(`
           
                <tr class="text-center" style="text-align:center;">
                    <td class="text-center" colspan="6"> NO DATA </td>
                </tr>
          
            `)
            } else {
                data.forEach((el, i) => {
                    $('#data-Todos').append(`
                <tr>
                <td class="text-left">${i + 1}</td>
                <td class="text-left">${el.title}</td>
                <td class="text-left">${el.description}</td>
                <td class="text-left">${el.due_date.slice(0, 10)}</td>
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
            getData()
            $("#title").val(''),
                $("#description").val(''),
                $("#due_date").val('')
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Todo has added successfully`,
                showConfirmButton: false,
                timer: 1500
            });
        })
        .fail(err => {
            swal({
                title: "Something Wrong",
                text: error(err.responseJSON.message),
                icon: "warning"
            });
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
            $('#main-page').hide()
            $('#edit-page').show()
            $('#form-edit').html(`
            <div class="form-group">
                <label>Title</label>
                <input type="title" class="form-control" id="title-edit" value="${data.title}">
            </div>
            <div class="form-group">
                <label >Description"</label>
                <input type="description" class="form-control" id="description-edit" value="${data.description}">
            </div>
            <div class="form-group">
                <label>Due Date (YYYY-MM-DD)</label>
                <input class="form-control" id="due_date-edit" value="${data.due_date.slice(0, 4)}-${data.due_date.slice(5, 7)}-${data.due_date.slice(8, 10)}">
            </div>
            <div id="edit-footer">
            <div class="container text-right">
            <button type="button" class="btn btn-danger" onClick ="cancelEdit()">Cancel</button>
            <button type="button" class="btn btn-primary" onClick="updateData(${data.id})">Edit</button>
            </div>
            </div>
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
            cancelEdit()
            getData()
        })
        .fail(err => {
            console.log(err)
            if (error(err.responseJSON.message) === `* invalid input syntax for type timestamp with time zone: "Invalid date"`) {
                swal({
                    title: "Something Wrong",
                    text: 'Invalid input : "Date", Make sure format YYYY/MM/DD',
                    icon: "warning"
                });
            } else {
                swal({
                    title: "Something Wrong",
                    text: error(err.responseJSON.message),
                    icon: "warning"
                });

            }

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
            console.log(data)
            $('#main-page').show()
            getData()
        })
        .fail(err => {
            console.log(err)

        })
}

// function deleteData(id) {
//     const swalWithBootstrapButtons = Swal.mixin({
//         customClass: {
//           confirmButton: 'btn btn-success',
//           cancelButton: 'btn btn-danger'
//         },
//         buttonsStyling: false
//       })
      
//       swalWithBootstrapButtons.fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonText: 'Yes, delete it!',
//         cancelButtonText: 'No, cancel!',
//         reverseButtons: true
//       }).then((result) => {
//         if (result.value) {
//             $.ajax({
//                 url: `${url}/todos/${id}`,
//                 method: 'DELETE',
//                 headers: {
//                     token: token
//                 }
//             })
//             .done(data => {
//                 swalWithBootstrapButtons.fire(
//                     'Deleted!',
//                     'Your file has been deleted.',
//                     'success'
//                   )
//                 getData()
//                 $('#main-page').show()
//             })
//         } else if (
//           /* Read more about handling dismissals below */
//           result.dismiss === Swal.DismissReason.cancel
//         ) {
//           swalWithBootstrapButtons.fire(
//             'Cancelled',
//             'Your imaginary file is safe :)',
//             'error'
//           )
//         }
//       })
//         .fail(err => {

//             console.log(err)
//         })
// }

function logout() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });

    localStorage.removeItem('token')
    $('#username-login').val('')
    $('#password-login').val('')
    $('#login-page').show()
    $('#username-register').val('')
    $('#email-register').val('')
    $('#password-register').val('')
    $('#login-page').show()
    $('#register-page').hide()
    $('#navbar').hide()
    $('#main-page').hide()
    $('#edit-page').hide()
    $('#footer').hide()
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Logout Success`,
        showConfirmButton: false,
        timer: 1500
    });
}

function cancelEdit() {
    $('#edit-page').hide()
    $('#main-page').show()

}



/* check token*/
$(document).ready(function () {
    if (!token) {
        $('#login-page').show()
        $('#register-page').hide()
        $('#navbar').hide()
        $('#main-page').hide()
        $('#edit-page').hide()
        $('#footer').hide()
    } else {
        getData()
        $('#navbar').show()
        $('#main-page').show()
        $('#login-page').hide()
        $('#register-page').hide()
        $('#edit-page').hide()
    }

    /* register */
    $('#register-anchor').click(function () {
        $('#login-page').hide()
        $('#footer').hide()
        $('#register-page').show()
    })

    /* button */
    $('#login-anchor').click(function () {
        $('#login-page').show()
        $('#register-page').hide()
        $('#navbar').hide()
        $('#main-page').hide()
        $('#edit-page').hide()
        $('#footer').hide()
    })

    /* button register */
    $("#register-page").on('submit', function (e) {
        e.preventDefault()
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

    $("#cencel-edit").click(function () {
        $('#navbar').show()
        $('#show-edit').hide()
        $('#main-page').show()
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
