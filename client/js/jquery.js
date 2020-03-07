let loginPage = $('#loginPage')
let todosTable = $('#todosTable')
let registerPage = $('#registerPage')
let url = "http://localhost:3000"
let token = localStorage.getItem('token')

if (!token) {
  $("#todosTable").hide()
  $("#todosPage").hide()
  $('#registerPage').show()
  $('#loginPage').hide()
  $('#logoutBtn').hide()
  $("#addPage").hide()
  $("#editPage").hide()
} else {
  getData()
  $("#todosTable").show()
  $('#registerPage').hide()
  $('#loginPage').hide()
  $('#logoutBtn').show()
  $("#todosPage").show()
  $("#addPage").hide()
  $("#editPage").hide()
}

function register() {
  $.ajax({
    url: `${url}/users/register`,
    contentType: 'application/json',
    method: 'POST',
    data: JSON.stringify({
      username: $('#usernameReg').val(),
      password: $('#passwordReg').val(),
      email: $('#emailReg').val()
    }),
  })
    .done((data) => {
      $("#todosTable").show()
      $("#registerPage").hide()
      $("#loginPage").hide()
      $('#logoutBtn').show()
      $("#todosPage").show()
      $('#usernameReg').val("")
      $('#passwordReg').val("")
      $('#emailReg').val("")
      // alert(data)
      // console.log(data);
      localStorage.setItem('token', data)
      // console.log(token);
      // getData()
      Swal.fire({
        title: 'Register Success!',
        text: "You already Login. WELCOME! :).",
        icon: 'success',
        confirmButtonText: 'Continue'
      })
    })
    .catch(err => {
      // alert("alerrtttt")
      console.log(err);
      Swal.fire({
        title: 'Register Error!',
        text: "Your email already exist.",
        icon: 'error',
        confirmButtonText: 'Continue'
      })
    })
}

function editOne(id) {
  $('#editPage').show()
  $.ajax({
    url: url + '/todos/' + id,
    method: 'GET',
    contentType: 'application/json',
    headers: { token: token },
    success: data => {
      // console.log(data);
      $('#editForm').append(
        `
        <h4>Edit Todo</h4>
        <br>
        <div class="form-group">
        <input type="text" class="form-control" value="${data.id}" hidden id="editId" aria-describedby="emailHelp" placeholder="Title">
        <label for="exampleInputEmail1">Title</label>        
        <input type="text" class="form-control" value="${data.title}" id="titleEdit" aria-describedby="emailHelp" placeholder="Title">
        </div>
        <div class="form-group">
        <label for="exampleInputEmail1">Description</label>
        <input type="text" class="form-control" value="${data.description}" id="descriptionEdit" aria-describedby="emailHelp"
        placeholder="Description">
        </div>
        <div class="form-group">
        <label for="exampleInputPassword1">Due Date</label>
        <input type="date" class="form-control" value="${moment(data.due_date).format('YYYY-MM-DD')}" id="due_dateEdit" placeholder="Date">
        </div>
        <button type="submit" class="btn btn-primary">Edit Todo</button>
        `
      )
    }
  })
}

$("#editForm").on('submit', function (e) {
  e.preventDefault()
  const id = Number($("#editId").val())
  console.log(id, $('#titleEdit').val(),
    $('#descriptionEdit').val(),
    $('#due_dateEdit').val());
  // alert(id)
  $.ajax({
    url: url + '/todos/' + id,
    method: "PUT",
    headers: { token: token },
    contentType: 'application/json',
    data: JSON.stringify({
      title: $('#titleEdit').val(),
      description: $('#descriptionEdit').val(),
      due_date: $('#due_dateEdit').val()
    })
  })
    .done(data => {
      $("#editPage").hide()
      $("#todosTable").show()
      getData()
      Swal.fire({
        title: 'Success!',
        text: 'You already updated your task!',
        icon: 'success',
        confirmButtonText: 'Continue'
      })
    })
    .fail(err => {
      Swal.fire({
        title: 'error!',
        text: 'You cannot leave one of them empty',
        icon: 'error',
        confirmButtonText: 'Continue'
      })
    })
}
)

function login() {
  $.ajax({
    url: `${url}/users/login`,
    method: `POST`,
    contentType: 'application/json',
    data: JSON.stringify({
      email: $('#emailLog').val(),
      password: $('#passwordLog').val(),
    })
  })
    .done((data) => {
      // console.log(data);
      localStorage.setItem('token', data)
      token = localStorage.getItem('token')
      getData()
      $('#registerPage').hide()
      $('#loginPage').hide()
      $('#logoutBtn').show()
      $("#todosPage").show()
      $("#todosTable").show()

      $('#emailLog').val("")
      $('#passwordLog').val("")
      Swal.fire({
        title: 'Login Success!',
        text: 'Do you want to continue',
        icon: 'success',
        confirmButtonText: 'Continue!'
      })
    })
    .catch(err => {
      Swal.fire({
        title: 'error!',
        text: 'Wrong Username/Password',
        icon: 'error',
        confirmButtonText: 'Continue'
      })
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
    .done((data) => {
      $('#todosData').empty()
      // console.log(data);
      data.forEach((el, index) => {
        if (el.status === "Sudah") {
          $('#todosData').append(
            `
            <tr class="">
                <td>${index + 1}</td>
                <td>${el.title}</td>
                <td>${el.description}</td>
                <td>${el.status}</td>
                <td>${moment(el.due_date).format('L')}</td>
                <td>
                <button type="button" onClick="del(${el.id})" class="btn btn-danger " title="" data-container="body" data-toggle="popover" data-placement="left" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." data-original-title="Popover Title">Remove</button>
                </td>                
            </tr>

            `
          )
        } else {
          $('#todosData').append(
            `
            <tr class="">
                <td>${index + 1}</td>
                <td>${el.title}</td>
                <td>${el.description}</td>
                <td>${el.status}</td>
                <td>${moment(el.due_date).format('L')}</td>
                <td>
                <button type="button" id="doneBtn${el.id}" onClick="updateDone(${el.id})" class="btn btn-success" title="" data-container="body" data-toggle="popover" data-placement="left" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." data-original-title="Popover Title">Done</button>                
                <button type="button" onClick="editOne(${el.id})" class="btn btn-warning " title="" data-container="body" data-toggle="popover" data-placement="left" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." data-original-title="Popover Title">Edit</button>
                <button type="button" onClick="del(${el.id})" class="btn btn-danger " title="" data-container="body" data-toggle="popover" data-placement="left" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." data-original-title="Popover Title">Cancel</button>
                </td>                
            </tr>

            `
          )
        }
      });

    })
    .catch(err => {
      console.log(err);
      Swal.fire({
        title: 'Invalid Token!',
        text: "Your Form is uncomplete. Please complete this form",
        icon: 'error',
        confirmButtonText: 'Continue'
      })

    })
}

function updateDone(id) {
  // alert(id)
  Swal.fire({
    title: 'Are you sure?',
    text: "You've done this task??",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, of course!'
  })
    .then((result) => {
      if (result.value) {
        console.log(id);
        $.ajax({
          url: `${url}/todos/${id}`,
          method: 'PUT',
          headers: {
            token: token
          },
          data: {
            status: 'Sudah'
          }
        })
          .done((data) => {
            console.log(data);
            getData()
            $(`#doneBtn${id}`).hide()
          })
          .done((data) => {
            Swal.fire(
              'Congratulations!!',
              `You've Done one task!!! .`,
              'success'
            )
            getData()
          })
      }
    })
}

function del(id) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      $.ajax({
        url: `${url}/todos/` + id,
        method: `DELETE`,
        headers: {
          token: token
        },
      })
        .done((data) => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          getData()
        })
    }
  })
}

function addData() {
  // e.preventDefault()
  // console.log($("#titleAdd").val(),
  //   $("#descriptionAdd").val(),
  //   $("#due_dateAdd").val());
  $.ajax({
    url: `${url}/todos`,
    method: 'POST',
    headers: {
      token: token
    },
    data: {
      title: $("#titleAdd").val(),
      description: $("#descriptionAdd").val(),
      due_date: $("#due_dateAdd").val()
    },
  })
    .done((data) => {
      Swal.fire({
        title: 'SUCCESS',
        text: "You added one task!!",
        icon: 'success',
        confirmButtonText: 'Continue'
      })
      getData()
    })
}

$('#loginForm').on('submit', (e) => {
  e.preventDefault();
  login();
  // getData();
})

$('#loginA').on('click', (e) => {
  e.preventDefault()
  // alert('masukk??')
  $('#registerPage').hide()
  $("#todosTable").hide()
  $('#loginPage').show()
})

$('#registerA').on('click', (e) => {
  e.preventDefault()
  // alert('masukk??')
  $('#registerPage').show()
  $("#todosTable").hide()
  $('#loginPage').hide()
})

$('#registerForm').on('submit', function (e) {
  e.preventDefault();
  // alert('masukk')
  // console.log($('#usernameReg').val(),
  //   $('#passwordReg').val(),
  //   $('#emailReg').val());
  register();
  getData();
})

$("#logoutBtn").on("click", function (e) {
  e.preventDefault()
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  localStorage.removeItem("token")

  $("#todosTable").hide()
  $('#registerPage').show()
  $('#loginPage').hide()
  $('#logoutBtn').hide()
  $("#todosPage").hide()
  Swal.fire({
    title: 'Logout Success!',
    text: 'Do you want to continue',
    icon: 'success',
    confirmButtonText: 'Continue'
  })
})

$('#showTodo').on('click', function (e) {
  $("#todosPage").show()
  $("#todosTable").show()
  $('#addPage').hide()
  getData()
})

$('#showAddTodo').on('click', function (e) {
  // $("#todosPage").hide()
  $("#todosTable").hide()
  $('#addPage').show()
})

$('#addForm').on('submit', function (e) {
  // e.preventDefault()
  addData()
  getData()
})

// function onSignIn(googleUser) {
//   var profile = googleUser.getBasicProfile();
//   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//   console.log('Name: ' + profile.getName());
//   console.log('Image URL: ' + profile.getImageUrl());
//   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
// }

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: `${url}/users/googleLogin`,
    method: `POST`,
    contentType: 'application/json',
    data: JSON.stringify({
      id_token: id_token
    })
  })
    .done((data) => {
      // console.log(data);
      localStorage.setItem('token', data)
      token = localStorage.getItem('token')
      getData()
      $('#registerPage').hide()
      $('#loginPage').hide()
      $('#logoutBtn').show()
      $("#todosPage").show()
      $("#todosTable").show()

      $('#emailLog').val("")
      $('#passwordLog').val("")
      // Swal.fire({
      //   title: 'Login Success!',
      //   text: 'Do you want to continue',
      //   icon: 'success',
      //   confirmButtonText: 'Continue!'
      // })
    })
    .catch(err => {
      Swal.fire({
        title: 'error!',
        text: 'Wrong Username/Password',
        icon: 'error',
        confirmButtonText: 'Continue'
      })
    })
}
