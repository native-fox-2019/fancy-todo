function showTodoGoogle(){
    $.ajax({
        url: 'http://localhost:3000/todos',
        method: 'GET',
        headers: {token: localStorage.getItem('token')},
        success: function(data){
            $('.table-data').empty();

            data.forEach(todos => {
                $('#table-todo').append(`<tr class="table-data">
                <td>${todos.title}</td>
                <td>${todos.description}</td>
                <td>${todos.status}</td>
                <td>${todos.due_date}</td>
                <td><button data-id="${todos.id}" class="btn-edit">Edit</button><button data-id="${todos.id}" class="btn-delete">Delete</button></td>
                </tr>`)
            });

            $('.parts').hide();
            $('#todo-list').show()
        }
    })
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    
    $.ajax({
        url: 'http://localhost:3000/user/googleLogin',
        method: 'POST',
        data:{token: id_token},
        success: function(data){
            localStorage.setItem('token', data);
            $('.parts').hide();
            showTodoGoogle();
        }
    })    
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }