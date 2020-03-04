function loginlink() {
    $('#login-form').show();
    $('#register-form').hide();
    $('#todos-list').hide();
    $('#logout').hide();
}

function registerlink() {
    $('#register-form').show();
    $('#login-form').hide();
    $('#todos-list').hide();
}

function showTodos() {
    $('#logout').show();
    $('#register-form').hide();
    $('#login-form').hide();
    $('#todos-list').show();
    if (localStorage.getItem('token')) {
        $.ajax({
            method: 'GET',
            url: 'http://localhost:3000/todos',
            headers: {
                token: `${localStorage.getItem('token')}`
            },
            success: (data) => {
                $('#todo-data').empty();
                // console.log(data);
                data.forEach(x => {
                    // console.log(x);
                    $('#todoList').append(`<tr id="todo-data">
                                                <td>${x.title}</td>
                                                <td>${x.description}</td>
                                                <td>${x.due_date}</td>
                                                <td><a href="#" id="edit-todo">Edit</a> | <a href="#" id="delete-todo">Delete</a></td>
                                            </tr>`)
                })
            },
            error: () => {
                console.log('masuk err');
            }
        })
    } else {
        loginlink();
    }
}