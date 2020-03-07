var BASE_URL = 'http://localhost:3000';
var TOKEN = localStorage.getItem('token');
var NAME = localStorage.getItem('name');
// due date is min now
addDuedate.min = new Date().toISOString().split("T")[0];
// updateDuedate.min = new Date().toISOString().split("T")[0];
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

// LOGIN GOOGLE

// function onSignIn(googleUser) {
//   var profile = googleUser.getBasicProfile();
//   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//   console.log('Name: ' + profile.getName());
//   console.log('Image URL: ' + profile.getImageUrl());
//   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
// }
function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        type: "POST",
        url: BASE_URL + "/loginGoogle",
        data: { id_token },
      })
      .done(data => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('name', data.name)
        TOKEN = localStorage.getItem('token')
        NAME = localStorage.getItem('name')
        getName()
        getAllTodos()
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
}

// END LOGIN GOOGLE

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
  $('#showUpdateTodo').hide()

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
  getAllHistory()
  $('#allCard').show();
  $('#detailTodo').hide();
  $('#showUpdateTodo').hide()
}
// END MENU SIDE

// END BUTTON

// FUNCTION

  // GET ONE TODOS
  function detailTodo(id) {
    // alert(id);
    $.ajax({
      type: "GET",
      url: `${BASE_URL}/todos/${id}`,
      headers: { token: TOKEN },
    })
      .done(data => {
        let alert = 'alert-success'
        if (data.status == 'false') {
          alert = 'alert-danger'
        }
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
                <div class="alert ${alert} p-0 text-right" role="alert">
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
function getAllTodos() {
    // console.log(localStorage.getItem('token'))
    $.ajax({
      type: "GET",
      url: `${BASE_URL}/todos`,
      headers: { token: localStorage.getItem('token') },
    })
      .done(data => {
        $('#showTodo').empty()
        data.forEach((el, index) => {
          if (el.status == 'false') {
            $('#showTodo').append(
              `
            <div class="mx-2 my-2">
            <div class="card" style="width: 11rem;">
              <div class="card-body">
                <h5 class="card-title">${el.title}</h5>
                <div class="alert alert-danger p-0" role="alert">
                  ${el.status}
                </div>
                <p class="card-text">${moment(el.due_date).format('LL')}.</p>
                <p class="card-text">${el.description}.</p>
                <a href="#" id="todo${el.id}" onClick="detailTodo(${el.id})" class="btn btn-primary btn-sm">Detail</a>
                <a href="#" id="todo${el.id}" onClick="updateStatusTodo(${el.id})" class="btn btn-warning btn-sm">Done</a>
                <a href="#" id="todo${el.id}" onClick="updateTodo(${el.id})" class="btn btn-info btn-sm">Edit</a>
              </div>
            </div>
            </div>
            `
            )
          }
        });
        // console.log(data)
      })
      .fail(err => {
        $('#showTodo').html(
          `<div class="mx-auto my-auto pt-5">
          <div><h3>${errorMsg(err)}</h3></div>
          </div>
          `
        )
      })
  }
  // END GET ALL TODOS

  // GET HISTORY

  function getAllHistory() {
    $('#addTodo').hide()
    $.ajax({
      type: "GET",
      url: `${BASE_URL}/todos`,
      headers: { token: TOKEN },
    })
      .done(data => {
        // $(document).ready(function () {
        //   $("button").click(function () {
        //     $("#div1").fadeIn(1000);
        //     $("#div2").fadeIn(2000);
        //     $("#div3").fadeIn(3000);
        //   });
        // });
        $('#showTodo').empty()
        data.forEach((el, index) => {
          if (el.status == 'true') {
            $('#showTodo').append(
              `
            <div id="div${index+1}" class="mx-2 my-2">
            <div class="card" style="width: 11rem;">
              <div class="card-body">
                <div class="d-flex align-content-around justify-content-around">
                  <h5 class="card-title">${el.title}</h5>
                  <div class="alert alert-success p-0" role="alert">
                    ${el.status}
                  </div>
                </div>
                <p class="card-text">${moment(el.due_date).format('LL')}.</p>
                <a href="#" id="todo${el.id}" onClick="deleteTodo(${el.id})" class="btn btn-danger btn-sm">Delete</a>
                </div>
            </div>
            </div>
            `
            )
          }
        });
        // console.log(data)
      })
      .fail(err => {
        $('#showTodo').html(
          `<div class="mx-auto my-auto pt-5">
          <div><h3>${errorMsg(err)}</h3></div>
          </div>
          `
        )
      })
  }

  // END HISTORY

  // UPDATE STATUS
  function updateStatusTodo(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You have doing this todo?!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, im done!'
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: "PATCH",
          url: `${BASE_URL}/todos/${id}`,
          headers: { token: TOKEN },
          data: { status: true }
        })
          .done(data => {
            getAllTodos()
            Swal.fire(
              'Updated!',
              `Your todo ${data.title} has been update.`,
              'success'
            )
          })
          .fail(err => {
            Swal.fire({
              title: 'Error!',
              html: `${errorMsg(err)}`,
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          })
      }
    })
  }
  // UPDATE STATUS
  //  UPDATE TODOS
  // function updateTodo(id) {
      
  //   }
    //  END UPDATE TODOS
  // DELETE TODO
  function deleteTodo(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: "DELETE",
          url: `${BASE_URL}/todos/${id}`,
          headers: { token: TOKEN },
        })
          .done(data => {
            getAllTodos()
            Swal.fire(
              'Deleted!',
              `Your todos ${data.title} has been deleted.`,
              'success'
            )
          })
          .fail(err => {
            Swal.fire({
              title: 'Error!',
              html: `${errorMsg(err)}`,
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          })
      }
    })
  }
  // DELETE TODO
// END FUNCTION

function getName() {
  $('#navbarDropdown').html(`${NAME}`);
}

// TOKEN CHECK
if (TOKEN) {
  $('#nav').show();
  $('#home').show();
  $('#login').hide();
  $('#register').hide();
  getAllTodos()
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
$('#formLogin').submit(function(e) {
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
      localStorage.setItem('name', data.name)
      TOKEN = localStorage.getItem('token')
      NAME = localStorage.getItem('name')
      getName()
      getAllTodos()
      // $('#nav').show();
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
      console.log('error')
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
  localStorage.removeItem('name')
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  }); 
  $('#home').hide();
  $('#login').show();
});
// END LOGOUT

// ADD TODOS
$('#formAddTodo').submit(function (e) {
  e.preventDefault();
  console.log('masuk ke add')
  const title = $('#addTitle').val();
  const description = $('#addDescription').val();
  const due_date = $('#addDuedate').val();
  const status = false
  $.ajax({
    type: "POST",
    url: BASE_URL + "/todos",
    data: {
      title, description, due_date, status,
    },
    headers: { token: TOKEN },
  })
    .done(data => {
      $('#allCard').show()
      $('#addTodo').show()
      $('#showAddTodo').hide()
      getAllTodos()
      Swal.fire({
        title: 'Succes!',
        text: `Congratulation ${data.title} has been create`,
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

// UPDATE
function updateTodo(id) {
  // alert(el);
  $.ajax({
    type: "GET",
    url: `${BASE_URL}/todos/${id}`,
    headers: { token: TOKEN },
  })
    .done(data => {
      let alert = 'alert-success'
      if (data.status == 'false') {
        alert = 'alert-danger'
      }
      $('#showAddTodo').hide();
      $('#addTodo').hide();
      $('#allCard').hide();
      $('#showUpdateTodo').show();
      $('#formUpdateTodo').html(
        `
          <h3 class="text-center">Update Todo</h3>
          
            <div class="form-group">
              <label for="updateTitle">Tittle</label>
              <input type="text" hidden value="${data.id}" class="form-control" id="updateId">
              <input type="text" value="${data.title}" class="form-control" id="updateTitle">
            </div>
            <div class="form-group">
              <label for="updateDescription">Description</label>
              <input type="text" value="${data.description}" class="form-control" id="updateDescription">
            </div>
            <div class="form-group">
              <label for="updateDuedate">Due Date</label>
              <input type="date" value="${moment(data.due_date).format('YYYY-MM-DD')}" name="datemin" class="form-control" id="updateDuedate">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          `
      );
    })
    .fail(err => {
      console.log(err)
    })
}
$(document).ready(function () {
  $('#formUpdateTodo').submit(function (e) {
    e.preventDefault();
    // alert('masuk')
    console.log('masuk ke update')
    const id = $('#updateId').val();
    const title = $('#updateTitle').val();
    const description = $('#updateDescription').val();
    const due_date = $('#updateDuedate').val();
    const status = $('#updateStatus').val();
    // const status = false

    $.ajax({
      type: "PUT",
      url: BASE_URL + `/todos/${id}`,
      data: {
        title, description, due_date, status,
      },
      headers: { token: TOKEN },
    })
      .done(data => {
        $('#allCard').show()
        $('#updateTodo').show()
        $('#showUpdateTodo').hide()
        getAllTodos()
        Swal.fire({
          title: 'Succes!',
          text: `Congratulation ${data.title} has been updated`,
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
})
// END UPDATE
