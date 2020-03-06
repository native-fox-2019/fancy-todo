const BASE_URL = "http://localhost:3000/todos";
const $login = $("#login");
const $register = $("#register");
const $home = $("#home");
const $list = $("#list-table");
const $edit = $("#edit");

if (localStorage.getItem("token")) {
  todo();
} else {
  login();
}

// PAGE LOGIN
function login() {
  $login.show();
  $register.hide();
  $home.hide();
  $edit.hide();
}

// PAGE REGISTER
function register() {
  $login.hide();
  $register.show();
  $home.hide();
  $edit.hide();
}

// HOME PAGE SETELAH LOGIN
function todo() {
  $login.hide();
  $register.hide();
  $edit.hide();
  $.ajax({
    type: "GET",
    url: BASE_URL,
    headers: {
      token: localStorage.getItem("token")
    }
  }).done(data => {
    $list.empty();
    data.forEach(element => {
      $list.append(`
      <tr>
      <td>${element.title}</td>
      <td>${element.description}</td>
      <td><span class="delete" style="color: orange;" onclick="editStatus(${element.id})" id="delete">${element.status}</span></td>
      <td>${element.due_date}</td>
      <td style="text-align: center;" >
      <span href="" class="delete" style="color: orange;" onclick="todoEdit(${element.id})" data-toggle="modal" data-target="#modalContactForm" id="delete">Edit</span>
       |
      <span  class="delete" style="color: orange;" onclick="todoDelete(${element.id})" id="delete">Delete</span>
      </td>
    </tr>`);
    });
    $home.show();
  });
}

// EDIT STATUS
function editStatus(id) {
  $.ajax({
    type: "GET",
    url: BASE_URL + "/" + id,
    headers: {
      token: localStorage.getItem("token")
    }
  }).done(response => {
    console.log(response);
    let status;
    if (response.status === "incomplete") {
      status = "complete";
    } else {
      status = "incomplete";
    }
    let inputData = { status };
    $.ajax({
      type: "PUT",
      url: BASE_URL + "/" + id,
      data: inputData,
      headers: {
        token: localStorage.getItem("token")
      }
    }).done(res => {
      todo();
    });
  });
}

// DELETE TODO
function todoDelete(id) {
  swal({
    title: "Are you sure want to delete?",
    icon: "warning",
    buttons: true,
    dangerMode: true
  }).then(willDelete => {
    if (willDelete) {
      $.ajax({
        type: "DELETE",
        url: BASE_URL + "/" + id,
        headers: {
          token: localStorage.getItem("token")
        },
        success: function(response) {
          todo();
          swal("Poof! Your todo has been deleted!", {
            icon: "success"
          });
        }
      });
    }
  });
}

// FITUR EDIT TODO
function todoEdit(id) {
  $.ajax({
    type: "GET",
    url: BASE_URL + "/" + id,
    headers: {
      token: localStorage.getItem("token")
    }
  }).done(response => {
    $("#title-edit").val(response.title);
    $("#description-edit").val(response.description);
    $("#date-edit").val(response.due_date);
    $("#edit-todo").on("submit", function(e) {
      e.preventDefault();
      let title = $("#title-edit").val();
      let description = $("#description-edit").val();
      let due_date = $("#date-edit").val();
      let inputData = { title, description, due_date };
      $.ajax({
        type: "PUT",
        url: BASE_URL + "/" + id,
        data: inputData,
        headers: {
          token: localStorage.getItem("token")
        }
      }).done(() => {
        $("#edit-todo")[0].reset();
        $("#modalContactForm").modal("toggle");
        todo();
      });
    });
  });
}

// FITUR HOME
$("#sign-up").on("click", function(e) {
  e.preventDefault();
  register();
});

$("#sign-in").on("click", function(e) {
  e.preventDefault();
  $("#form-register")[0].reset();
  login();
});

$("#cancel-edit").on("click", function(e) {
  e.preventDefault();
  todo();
});

// SIGN IN NORMAL
$("#form-sign-in").on("submit", function(e) {
  e.preventDefault();
  let username = $("#username").val();
  let password = $("#password").val();
  let userData = { username, password };
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/user/login",
    data: userData
  })
    .done(response => {
      localStorage.setItem("token", response.token);
      swal({
        title: `Welcome ${response.fullname}`,
        text: "Here is your todo list, don't forget your deadline !",
        icon: "success"
      });
      todo();
    })
    .fail(err => {
      swal({
        title: "Invalid Username or Password.",
        text: "Please input valid data",
        icon: "error"
      });
    });
});

// GOOGLE SIGN IN
function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/user/google",
    data: { id_token }
  })
    .done(response => {
      localStorage.setItem("token", response.token);
      swal({
        title: "Welcome Back",
        text: "Here is your todo list, Don't forget your deadline !",
        icon: "success"
      });
      todo();
    })
    .fail(err => {
      console.log(err);
    });
}

// GOOGLE SIGN OUT
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function() {
    localStorage.clear();
    login();
  });
}

// REGISTER USER
$("#form-register").on("submit", function(e) {
  e.preventDefault();
  let fullname = $("#fullname-register").val();
  let username = $("#username-register").val();
  let email = $("#email-register").val();
  let password = $("#password-register").val();
  let inputData = {
    fullname,
    username,
    email,
    password
  };
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/user/register",
    data: inputData,
    success: function(response) {
      login();
      $("#form-register")[0].reset();
    }
  });
});

// ADD TODO

$("#add-todo").on("click", function(e) {
  e.preventDefault();
  let title = $("#title").val();
  let description = $("#description").val();
  let status = $("#status").val();
  let due_date = $("#due_date").val();
  let inputData = { title, description, status, due_date };
  console.log(inputData);
  $.ajax({
    type: "POST",
    url: BASE_URL,
    data: inputData,
    headers: {
      token: localStorage.getItem("token")
    }
  }).done(response => {
    $("#add-todo")[0].reset();
    $("#exampleModal").modal("toggle");
    todo();
  });
});
