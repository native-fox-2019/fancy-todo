


$(document).ready(function () {
  $('#login').show()
  $('#register').hide()
  $('#todolistPage').hide()
  $('#editTodosDiv').hide()
  $('#addTodosDiv').hide()
  $('#todosForm').hide()
  $('#todolistPage').hide()


  if (!localStorage.getItem('token')) {
    $('#login').show()
    $('#register').hide()
    // $('#todolistPage').hide()
    // $('#editTodosDiv').hide()
  } else {
    $('#login').hide()
    $('#todolistPage').show()
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
    // $('#todolistPage').show()
    $('#login').hide()
    $('#editTodosDiv').hide()

  })

  $("#actionToRegister").on('submit', function (event) {
    event.preventDefault()
    let username = $('#usernameRegister').val()
    let email = $('#emailRegister').val()
    let password = $('#passwordRegister').val()
    register(username, email, password)
    // $('#todolistPage').show()
    $('#register').hide()
    $('#editTodosDiv').hide()
  })

  $('#btn_google').on('click', function (event) {
    $('#login').hide()
    onSignIn()
  })

  $('#addTodoList').on('click', function (event) {
    $('#addTodosDiv').show()
    $('#todosForm').show()
    $('#todolistPage').hide()
  })

  $('#todosForm').on('submit', function (event) {
    event.preventDefault()
    let title = $('#titleAdd').val()
    let description = $('#descriptionAdd').val()
    let due_date = $('#due_dateAdd').val()
    addTodos(title, description, due_date)
    $('#todolistPage').show()
    $('#login').hide()
    // $('#editTodosDiv').hide()
    $('#addTodosDiv').hide()
  })

  $('#tolistPage').on('click', function () {
    $('#todolistPage').show()
    $('#addTodosDiv').hide()
  })

  $('#cancelEdit').on('click', function () {
    $('#editTodosDiv').hide()
    $('#todolistPage').show()
  })

  $('#todosEdit').on('submit', function (event) {
    event.preventDefault()
    $('#editTodosDiv').hide()
    $('#todolistPage').show()
    editTodosButton()
    showAllTodos()
  })


  //logout
  $('#logoutTodoList').on('click', function () {
    logoutTodos()
    // $('#login').show()
  })

})