$(document).ready(function(){
  var token = localStorage.getItem('token')
  if(token){
    console.log(token)
    afterLogin()
  }
  else{
    afterLogout();
  }
})

function afterLogin(){
  //$('#before-login').hide()
  console.log('masukkkkkk');
  $('#before-login').hide()

  $('#list-todos').show()
  $('.edit-todo').hide()
  $('.add-todo').hide()
}

function afterLogout(){
  $('#before-login').show()
  $('#list-todos').hide()
}

//Login Action
$("#login-form").submit(function(e) {
  e.preventDefault();
    $.ajax({
      method: 'post',
      url: 'http://localhost:3000/login',
      data: {
        email: $('#email').val(),
        password: $('#password').val()
      }
    })
    .done(function(token){
      //alert('Login Success')
      localStorage.setItem('token', token)
      // $('.container').toggle()
      afterLogin();
    })
    .fail(function() {
      afterLogout();
       alert( "Wrong username or password" );
    })

});

//Register action
$('#password-register').focus(function(){
  $('#passwordRecomForm').empty()
  $.ajax({
    method: 'get',
    url: 'https://password.markei.nl/human.json?count=3',
  })
  .done(function(data){
    data.passwords.forEach(password => {
      $('#passwordRecomForm').append(`<small class=""><button type="button" class="btn btn-sm btn-link" onclick="setPassword('${password}')">${password}</button></small>`)
    });
    console.log(data)
  })
})
$("#register-form").submit(function(e) {
  e.preventDefault();
    $.ajax({
      method: 'post',
      url: 'http://localhost:3000/register',
      data: {
        email: $('#email-register').val(),
        password: $('#password-register').val()
      }
    })
    .done(function(data){
      alert('Register Success')
      $('form').toggle()
    })
    .fail(function() {
       alert( "Email already registered" );
    })

});

//caching form login dan register
let $loginForm = $('#login-form')
let $registerForm = $('#register-form')

$('button[name = "changeForm"]').click(function(){
  $('form').toggle()
})


if(localStorage.getItem('token')){
  
  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/todos',
    beforeSend: function(request) {
      request.setRequestHeader("usertoken", localStorage.getItem('token'));
    },
  })
  .done(function (todos){
    // $('#showTodos').empty()
    $('.container').toggle()
    todos.forEach(todo => {
      $('#showTodos').append(
        `<tr>
          <td>${todo.title}</td>
          <td>${todo.description}</td>
          <td>${todo.status}</td>
          <td>${todo.due_date}</td>
          <td>
            <button class="btn btn-warning " id="button-edit" onclick="editTodo(${todo.id})" }">Edit</button> 
            <button class="btn btn-danger " id="button-delete" onclick="deleteTodo(${todo.id})" }">Delete</button>
          </td>
         <tr>`)
    })  
  });
  showTodos()
}

function showTodos(){
  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/todos',
    beforeSend: function(request) {
      request.setRequestHeader("usertoken", localStorage.getItem('token'));
    },
  })
  .done(function (todos){
    $('#showTodos').empty()
    todos.forEach(todo => {
      $('#showTodos').append(
        `<tr>
          <td>${todo.title}</td>
          <td>${todo.description}</td>
          <td>${todo.status}</td>
          <td>${todo.due_date}</td>
          <td>
            <button class="btn btn-warning " id="button-edit" onclick="editTodo(${todo.id})" }">Edit</button> 
            <button class="btn btn-danger " id="button-delete" onclick="deleteTodo(${todo.id})" }">Delete</button>
          </td>
         <tr>`)
    })  
  });
}

//logout button action
$('#button-logout').on("click", function(){
  localStorage.removeItem('token')
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  afterLogout()
})

//add button action
function addTodo(){
  $('.list-todos').hide()
  $('.add-todo ').show()

  //action dari save button
  $("#add-form-todo").submit(function(e) {
    e.preventDefault();
    console.log($('#todo-title').val())
    $.ajax({
      method: 'post',
      url: `http://localhost:3000/todos`,
      data: {
        title: $('#todo-title-add').val(),
        description: $('#todo-description-add').val(),
        status: $('#todo-status-add').val(),
        due_date: $('#todo-due_date-add').val(),
      },
      beforeSend: function(request) {
        request.setRequestHeader("usertoken", localStorage.getItem('token'));
      },
    })
    .done(function(data){
      //set kosong saat sudah add sebelumnya berhasil
      $('#todo-title-add').val('')
      $('#todo-description-add').val('')
      $('#todo-status-add').val('')
      $('#todo-due_date-add').val('')

      $('.add-todo').hide()
      $('.list-todos').show()
      showTodos()
    })
    .fail(function(err) {
      console.log(JSON.stringify(err))
      $('#error-notification').text(err.responseJSON)
    })
  })
}

//edit button action
function editTodo(id){
  //isi form dengan value sebelumnya

  $('.list-todos').hide()
  $('.edit-todo ').show()

  $.ajax({
    method: 'get',
    url: `http://localhost:3000/todos/${id}`,
    beforeSend: function(request) {
      request.setRequestHeader("usertoken", localStorage.getItem('token'));
    },
  })
  .done(function(todo){
    $(document).ready(function(){
      $('#todo-title').val(`${todo.title}`)
      $('#todo-description').val(`${todo.description}`)
      let date = todo.due_date.substring(0, 10).split('-')
      $('#todo-due_date').val(`${date.join('-')}`)
    })
  })

  //action dari save button
  $("#edit-form-todo").submit(function(e) {
    e.preventDefault();
    console.log('massuukkkk')
    $.ajax({
      method: 'put',
      url: `http://localhost:3000/todos/${id}`,
      data: {
        title: $('#todo-title').val(),
        description: $('#todo-description').val(),
        status: $('#todo-status').val(),
        due_date: $('#todo-due_date').val(),
      },
      beforeSend: function(request) {
        request.setRequestHeader("usertoken", localStorage.getItem('token'));
      },
    })
    .done(function(data){
      $('.edit-todo ').hide()
      $('.list-todos').show()
      showTodos()
    })
    .fail(function(err) {
      console.log(err)
      alert( "edit todo failed" );
    })
  })
}

//delete button action
function deleteTodo(id){
  $.ajax({
    method: 'delete',
    url: `http://localhost:3000/todos/${id}`,
    beforeSend: function(request) {
      request.setRequestHeader("usertoken", localStorage.getItem('token'));
    },
  })
  .done(function(data){
    showTodos()

  })
  .fail(function() {
     alert( "delete failed" );
  })
}

function setPassword(password){
  $('#password-register').val(password)
  $('#passwordRecomForm').empty()
}



function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  sendGoogleToken(id_token)
}

function sendGoogleToken(idToken){
  console.log(idToken)
  $.ajax({
    method: 'post',
    url: 'http://localhost:3000/googleSignIn',
    data: { token: idToken },
    success: function(response) {
      console.log(response)
      localStorage.setItem('token', response.access_token)
      afterLogin()
    }
  })
}


  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
