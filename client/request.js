const server = `http://localhost:3000`

// register user
function register(username, email, password) {
  $.ajax({
    method: 'post',
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
      console.log(data, '<<<<< data login')
    })
    .fail(err => {
      console.log(err.responseJSON, '<<<<<<< error')
    })
}

// post add todo
// function addTodos() {

// }






