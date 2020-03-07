
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
      alert('Login Success')
      localStorage.setItem('token', token)
      $('.container').toggle()
    })
    .fail(function() {
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
  $('.container').toggle()
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
       alert( "add todo failed" + JSON.stringify(err) );
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
    .fail(function() {
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

if (auth2.isSignedIn.get()) {
  var profile = auth2.currentUser.get().getBasicProfile();
  console.log('ID: ' + profile.getId());
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
}

// gapi.load('auth2', function() {
//   auth2 = gapi.auth2.init({
//     client_id: 'CLIENT_ID.apps.googleusercontent.com',
//     fetch_basic_profile: false,
//     scope: 'profile'
//   });

//   // Sign the user in, and then retrieve their ID.
//   auth2.signIn().then(function() {
//     console.log(auth2.currentUser.get().getId());
//   });
// });

// function onSignIn(googleUser) {
//   var id_token = googleUser.getAuthResponse().id_token;
//   var xhr = new XMLHttpRequest();
//   xhr.open('POST', 'https://yourbackend.example.com/tokensignin');
//   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//   xhr.onload = function() {
//     console.log('Signed in as: ' + xhr.responseText);
//   };
//   xhr.send('idtoken=' + id_token);
//   $.ajax({
    
//   })
// }