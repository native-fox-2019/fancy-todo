
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
$("#register-form").submit(function(e) {
  e.preventDefault();
    $.ajax({
      method: 'post',
      url: 'http://localhost:3000/register',
      data: {
        email: $('#email').val(),
        password: $('#password').val()
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
  .done(function(todos){
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
            <button class="btn btn-warning " id="button-edit" value="${todo.id}">Edit</button> 
            <button class="btn btn-danger " id="button-edit" value="${todo.id}">Delete</button>
          </td>
         <tr>`)
    })
  });
}

$('#button-logout').on("click", function(){
  localStorage.removeItem('token')
  $('.container').toggle()
})