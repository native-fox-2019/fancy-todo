var BASE_URL = 'http://localhost:3000';
var TOKEN = localStorage.getItem('token');
if (TOKEN) {
  $('#home').show();
  $('#login').hide();
  $('#register').hide();
} else {
  $('#home').hide();
  $('#login').show();
  $('#register').hide();
}
$('#btn-login').click(function (e) { 
  e.preventDefault();
  $('#login').show();
  $('#register').hide();
});
$('#btn-register').click(function (e) {
  e.preventDefault();
  $('#register').show();
  $('#login').hide();
});

// ERROR HANDLER 
var errorMsg = (err) => {
  if (Array.isArray(err.responseJSON.message)) {
    let errorMessage = ''
    err.responseJSON.message.forEach(element => {
      errorMessage += element + '<br>'
    });
    return errorMessage
  } else {
    return err.responseJSON.message
  }
} 

// GET ALL DATA
var getAllTodo = () => {
  $.ajax({
    type: "GET",
    url: `${BASE_URL}/todos`,
  })
    .done(data => {
      return data
    })
    .fail(err => {
      return err
  })
}

// REGISTER
$('#formRegister').submit(function (e) { 
  e.preventDefault();
  const name = $('#nameRegister').val();
  const email = $('#emailRegister').val();
  const password = $('#passwordRegister').val();
  $.ajax({
    type: "POST",
    url: BASE_URL+"/register",
    data: {
      name, email, password
    },
  })
    .done(data => {
      Swal.fire({
        title: 'Succes!',
        text: `Congratulation ${data.name} youre account has been create, Please Login`,
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    })
    .fail(err => {
      Swal.fire({
        title: 'Error!',
        html: `${errorMsg(err)}`,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    })
});

// LOGIN
$('#formLogin').submit(function (e) {
  e.preventDefault();
  const email = $('#emailLogin').val();
  const password = $('#passwordLogin').val();
  $.ajax({
    type: "POST",
    url: BASE_URL + "/login",
    data: {
      email, password
    },
  })
    .done(data => {
      localStorage.setItem('token', data.token)
      $('#home').show();
      $('#login').hide();
      $('#register').hide();
      getAllTodo()
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      })
    })
    .fail(err => {
      Swal.fire({
        title: 'Error!',
        html: `${errorMsg(err)}`,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    })
});

// LOGOUT
$('#logout').click(function (e) { 
  e.preventDefault();
  localStorage.removeItem('token')
  $('#home').hide();
  $('#login').show();
});