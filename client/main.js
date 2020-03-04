var BASE_URL = 'http://localhost:3000';
var TOKEN = localStorage.getItem('token');
// due date is min now
addDuedate.min = new Date().toISOString().split("T")[0];
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
// END ERROR HANDLER

// BUTTON
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

  // ADD TODO
  $('#addTodo').click(function (e) {
    e.preventDefault();
    $('#showAddTodo').show();
    $('#allCard').hide();
    $('#addTodo').hide();
  });
  $('#showAddTodo').hide();
  // END ADD TODO

// MENU SIDE
function showAllTodo() {
  getAllTodos()
  $('#allCard').show();
  $('#addTodo').show();
  $('#detailTodo').hide();
  $('#showAddTodo').hide();
}
function showTodayTodo() {
  const date = new Date()
  console.log(date)
  console.log(moment(date).format('ll'))
}

function showNext7DayTodo() {
  const date = new Date()
  console.log(date)
  console.log(moment(moment(date).add(7, 'days').calendar()).format('LL'))
}

function showMonthTodo() {
  const date = new Date()
  console.log(date)
  var startDate = moment([2020, 3 - 1]);

  var endDate = moment(startDate).endOf('month');

  console.log(startDate.toDate());
  console.log(endDate.toDate());

  console.log({ start: startDate, end: endDate });
}

function showHistoryTodo() {
  const date = new Date()
  console.log(date)
  console.log(moment(date).endOf('month').fromNow())
}
// END MENU SIDE

// END BUTTON


// TOKEN CHECK
if (TOKEN) {
  $('#nav').show();
  $('#home').show();
  $('#login').hide();
  $('#register').hide();
  $.ajax({
    type: "GET",
    url: `${BASE_URL}/todos`,
    headers: { token: TOKEN },
  })
    .done(data => {
      data.forEach((el, index) => {
        $('#showTodo').append(
          `
          <div class="mx-2 my-2">
          <div class="card" style="width: 11rem;">
            <div class="card-body">
              <div class="d-flex align-content-around justify-content-around">
                <h5 class="card-title">${el.title}</h5>
                <div class="alert alert-danger p-0" role="alert">
                  ${el.status}
                </div>
              </div>
              <p class="card-text">${moment(el.due_date).format('LL')}.</p>
              <a href="#" id="todo${el.id}" onClick="detailTodo(${el.id})" class="btn btn-primary">Detail</a>
            </div>
          </div>
          </div>
          `
        )
      });
      console.log(data)
    })
    .fail(err => {
      console.log(err)
    })
} else {
  $('#nav').hide();
  $('#home').hide();
  $('#login').show();
  $('#register').hide();
}
// END TOKEN CHECK


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
// END REGISTER

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
      $('#nav').show();
      $('#home').show();
      $('#login').hide();
      $('#register').hide();
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
// END LOGIN

// LOGOUT
$('#logout').click(function (e) { 
  e.preventDefault();
  localStorage.removeItem('token')
  $('#home').hide();
  $('#login').show();
});
// END LOGOUT

// GET ONE TODOS
function detailTodo(id) {
  // alert(id);
  $.ajax({
    type: "GET",
    url: `${BASE_URL}/todos/${id}`,
    headers: { token: TOKEN },
  })
    .done(data => {
      console.log(data)
      // $('#detailTodo').show();
      // $('#detailTodo').insertAfter(
        //   `
        //   ${data.title}
        //   `
        // );
      $('#showAddTodo').hide();
      $('#addTodo').hide();
      $('#allCard').hide();
      $('#detailTodo').show();
      $('#detailTodo').html(
        `
        <div class="card mb-2">
          <div class="card-body">
            <div class="">
              <div class="d-flex align-content-around justify-content-center">
                <h5 class="card-title">${data.title}</h5>
              </div>
              <div class="alert alert-danger p-0 text-right" role="alert">
                <div class="">${data.status}</div>
              </div>
            </div>
            <p class="card-text">${data.description}.</p>
            <p class="card-text"><small class="text-muted">Due date : ${moment(data.due_date).format('LL')}</small></p>
          </div>
        </div>
        `
      );
    })
    .fail(err => {
      console.log(err)
    })
}
// END GET ONE TODOS

// GET ALL TODOS
var getAllTodos = () => {
  $.ajax({
    type: "GET",
    url: `${BASE_URL}/todos`,
    headers: { token: TOKEN },
  })
    .done(data => {
      $('#showTodo').empty()
      data.forEach((el, index) => {
        $('#showTodo').append(
          `
          <div class="mx-2 my-2">
          <div class="card" style="width: 11rem;">
            <div class="card-body">
              <div class="d-flex align-content-around justify-content-around">
                <h5 class="card-title">${el.title}</h5>
                <div class="alert alert-danger p-0" role="alert">
                  ${el.status}
                </div>
              </div>
              <p class="card-text">${moment(el.due_date).format('LL')}.</p>
              <a href="#" id="todo${el.id}" onClick="detailTodo(${el.id})" class="btn btn-primary">Detail</a>
            </div>
          </div>
          </div>
          `
        )
      });
      console.log(data)
    })
    .fail(err => {
      console.log(err)
    })
}
// END GET ALL TODOS

// ADD TODOS
$('#formAddTodo').submit(function (e) {
  e.preventDefault();
  const title = $('#addTitle').val();
  const description = $('#addDescription').val();
  const due_date = $('#addDuedate').val();
  $.ajax({
    type: "POST",
    url: BASE_URL + "/register",
    data: {
      title, description, due_date, status: false,
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
// END ADD TODOS
// $('#detailTodo').click(function (e) {
//   e.preventDefault();
//   alert('detail')
// });

