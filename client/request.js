const server = `http://localhost:3000`

// register user
function register(username, email, password) {
  $.ajax({
    method: 'POST',
    url: `${server}/users/register`,
    data: {
      username: username,
      email: email,
      password: password
    },
  })
    .done(data => {
      localStorage.setItem('token', data)
      $('#todolistPage').show()
      showAllTodos()
      showTableTodos(data)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'welcome',
        showConfirmButton: false,
        timer: 1500
      })

    })
    .fail(err => {
      $('#register').show()
      console.log(err.responseJSON, '<<<<< err')
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: `${err.responseJSON}`,
        showConfirmButton: false,
        timer: 2000
      })
    })
}

// login user
function login(email, password) {
  $.ajax({
    method: 'POST',
    url: `${server}/users/login`,
    data: {
      email: email,
      password: password
    }
  })
    .done(data => {
      localStorage.setItem('token', data)
      $('#todolistPage').show()
      showAllTodos()
      // showTableTodos(data)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Welcome Back',
        showConfirmButton: false,
        timer: 1500
      })
    })
    .fail(err => {
      $('#login').show()
      console.log(err.responseJSON)
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: `${err.responseJSON}`,
        showConfirmButton: false,
        timer: 2000
      })
    })
}

// get all todos showall
function showAllTodos() {
  $.ajax({
    method: 'GET',
    url: `${server}/todos`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(data => {
      // console.log(data, '<<<<<<< showAlltodos')
      showTableTodos(data)
      // $('#editTodosDiv').hide()
    })
    .fail(err => {
      console.log(err.responseJSON)
    })
}


// add todos
function addTodos(titleAdd, descriptionAdd, due_dateAdd) {
  $.ajax({
    method: 'POST',
    url: `${server}/todos`,
    data: {
      title: titleAdd,
      description: descriptionAdd,
      due_date: due_dateAdd
    },
    headers: {
      token: localStorage.getItem('token')
    }

  })
    .done(data => {
      showAllTodos()
      // showTableTodos(data)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    })
    .fail(err => {
      console.log(err.responseJSON)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err.responseJSON}`,
        // footer: '<a href>Why do I have this issue?</a>'
      })
    })
}


//delete todos
function deletTodos(id) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#6c757d',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      $.ajax({
        method: 'delete',
        url: `${server}/todos/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .done(data => {
          showAllTodos()
        })
        .fail(err => {
          console.log(err.responseJSON)
        })

    }
  })
}


// edit todos
function getTodosbyId(id) {
  $.ajax({
    method: 'get',
    url: `${server}/todos/${id}`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(data => {
      // showAllTodos()
      $('#todolistPage').hide()
      $('#editTodosDiv').show()
      // getEditTodos(data)
      localStorage.setItem('id', data.id)
      $('#titleEdit').val(data.title)
      $('#descriptionEdit').val(data.description)
      $('#statusEdit').val(data.status)
      $('#due_dateEdit').val(`${new Date(data.due_date).toISOString().substring(0, 10)}`)

    })
    .fail(err => {
      console.log(err.responseJSON)
    })
}

function editTodosButton() {
  $.ajax({
    method: 'put',
    url: `${server}/todos/${localStorage.id}`,
    headers: {
      token: localStorage.getItem('token')
    },
    data: {
      title: $('#titleEdit').val(),
      description: $('#descriptionEdit').val(),
      status: $('#statusEdit').val(),
      due_date: $('#due_dateEdit').val()
    }
  })
    .done(data => {
      localStorage.removeItem('id')
      showAllTodos()
      // console.log(data, '<<<<<<< edit todos button')
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    })
    .fail(err => {
      console.log(err.responseJSON)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err.responseJSON}`,
        // footer: '<a href>Why do I have this issue?</a>'
      })
    })
}

// logout action
function logoutTodos() {
  localStorage.clear()
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  $('#todolistPage').hide()
  // $('#login').reset()
  $('#login').show()
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: "POST",
    url: `${server}/users/googleSignIn`,
    data: {
      token: id_token
    }
  })
    .done(data => {
      localStorage.setItem('token', data)
      $('#todolistPage').show()
      showAllTodos()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'welcome',
        showConfirmButton: false,
        timer: 1500
      })
    })
    .fail(err => {
      $('#login').show()
      console.log(err.responseJSON)
    })
}


