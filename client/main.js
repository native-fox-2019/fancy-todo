

$(document).ready(function () {
  $('#register').hide()
  $('#allTodos').hide()
  $('#todolistPage').hide()
  $('#addTodosDiv').hide()
  // $('#tableTodos').empty()

  if (!localStorage.getItem('token')) {
    $('#register').hide()
    $('#login').show()
    $('#todolistPage').hide()
  } else {
    $('#register').hide()
    $('#login').hide()
    $('#todolistPage').show()
    // $('#addTodosDiv').show()
    showAllTodos()
  }

  $('#toRegister').on('click', function (event) {
    $('#register').show()
    $('#login').hide()
  })

  $('#toLogin').on('click', function (event) {
    $('#register').hide()
    $('#login').show()
  })

  $("#actionTologin").on('submit', function (event) {
    event.preventDefault()
    let emailLogin = $('#emailLogin').val()
    let passwordLogin = $('#passwordLogin').val()
    login(emailLogin, passwordLogin)
    $('#allTodos').show()
    $('#login').hide()
  })

  $("#actionToRegister").on('submit', function (event) {
    event.preventDefault()
    let username = $('#usernameRegister').val()
    let email = $('#emailRegister').val()
    let password = $('#passwordRegister').val()
    register(username, email, password)
    // $('#allTodos').show()
  })

  $('#AddTodoList').on('click', function (event) {
    $('#addTodosDiv').show()
    $('#todolistPage').hide()
  })

  $('#todosForm').on('submit', function (event) {
    event.preventDefault()
    let title = $('#titleAdd').val()
    let description = $('#descriptionAdd').val()
    let due_date = $('#due_dateAdd').val()
    addTodos(title, description, due_date)
  })

})