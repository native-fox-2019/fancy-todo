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
      // console.log(data, '<<<<< data login')
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
      // token: `${localStorage.getItem('token')}`
    }
  })
    .done(data => {
      showTableTodos(data)
      console.log(data, '<<<<<<<<<<<<<<< show all')
      // $('#todolistPage').show()
      // showAllTodos(data)
    })
    .fail(err => {
      console.log(err.responseJSON)
    })
}


function showTableTodos(data) {
  // let table = $('#tableTodos')
  // table.empty()
  $('#tableTodos').empty()
  data.forEach(el => {
    $('#tableTodos').append(`<tr>
    <td class='title'>${el.title}</td>
    <td class='description'>${el.descripton}</td>
    <td class='status'>${el.status}</td>
    <td class='due_date'>${el.due_date}</td>
    <td>
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-secondary" id="editTodos" onclick="editTodos(${el.id})">Edit</button>
        <button type="button" class="btn btn-secondary" id="deleteTodos" onclick=deletTodos(${el.id})>Delete</button>
      </div>
    </td>
  </tr>`)
  });

}


