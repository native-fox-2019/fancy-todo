
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
      alert('Berhasil login')
      localStorage.setItem('token', token)
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
      alert('Berhasil login')
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
  $('.row').toggle()
}

$('#button-logout').on("click", function(){
  localStorage.removeItem('token')
})