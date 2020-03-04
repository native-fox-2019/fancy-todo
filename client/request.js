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
      console.log(data, '<<<<<< data done')
      localStorage.setItem('token', data)
    })
    .fail(err => {
      console.log(err.responseJSON, '<<<<< err')
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
    })
    .fail(err => {
      console.log(err.responseJSON, '<<<<<<< error')
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
      showTableTodos(data)

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
      // $('#addTodosDiv').show()
    })
    .fail(err => {
      console.log(err.responseJSON)
    })
}


//delete todos
function deletTodos(id) {
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