const register = (firstName, lastName, email, password) => {
    $.ajax({
        method: 'post',
        url: 'http://localhost:3000/register',
        data: {
            "first_name": firstName,
            "last_name" : lastName,
            "email" : email,
            "password" : password
        },
        success: result => {
            localStorage.removeItem("signup")
            login(result.email, result.password)
        },
        error: (jqxhr, status, error) => {
            console.log(status, error)
        }
    })
}


const login = (email, password) => {
    $.ajax({
        method: 'post',
        url: 'http://localhost:3000/login',
        data: {"email": email, "password": password},
        success: result => {
            let token = result
            localStorage.setItem("token", token)
            $allPage.hide()
            $btnSignout.show()
            $todoContainer.show()
            showTodo()
        },
        error: (jqxhr, status, error) => {
            console.log(status, error)
        }
    })
}

const showTodo = () => {
    $.ajax({
        method: 'get',
        url: 'http://localhost:3000/todos',
        headers: {
            "token": localStorage.getItem("token")
        },
        success: (data) => {
            if (data.length) {
                $todoTbody.empty()
                data.forEach(todo => {
                    let $todoItem =  $(`<tr><td>${todo.title}</td><td>${todo.description}</td><td>${todo.due_date}</td></tr>`)
                    let $btnDelete = $(`<td><button class="btn btn-primary" >Delete</button></td>`)
                    let $btnCheck = $(`<td><input type="checkbox" class="form-check-input ml-2" ${todo.status === 'Completed' ?  'checked' : ''}></td>`)
                    $btnDelete.on('click', () => {
                        deleteTodo(todo.id)
                    })
                    $btnCheck.on('click', (e) => {
                        checkTodo(todo, e.target.checked)
                    })
                    $todoItem.append($btnDelete)
                    $todoItem.prepend($btnCheck)
                    $todoTbody.append($todoItem)
                })
            } else {
                $todoTbody.empty()
            }
        },
        error: (jqxhr, status, error) => {
            console.log(error)
        }
    })
}

const addTodo = todo => {
    $.ajax({
        method: 'post',
        url: `http://localhost:3000/todos`,
        headers: {
            "token": localStorage.getItem("token")
        },
        data: todo,
        success: () => {
            console.log('todo created')
            $addTodoForm[0].reset()
            showTodo()
        },
        error: (jqxhr, status, error) => {
            console.log(error)
        }
    })
}

const deleteTodo = id => {
    $.ajax({
        method: 'delete',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            "token": localStorage.getItem("token")
        },
        success: () => {
            showTodo()
        },
        error: (jqxhr, status, error) => {
            console.log(error)
        }
    })
}

const checkTodo = (todo, status) => {
    $.ajax({
        method: 'put',
        url: `http://localhost:3000/todos/${todo.id}`,
        headers: {
            "token": localStorage.getItem("token")
        },
        data: {
            "title" : todo.title,
            "description" : todo.description,
            "status" : status ? "Completed" : "Not Started",
            "due_date" : todo.due_date
        },
        success: () => {
            showTodo()
        },
        error: (jqxhr, status, error) => {
            console.log(error)
        }
    })
}

function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'post',
        url: 'http://localhost:3000/googleLogin',
        data: { "token": id_token },
        success: token => {
            console.log('User signed in.')
            localStorage.setItem("token", token)
            showTodo()
        },
        error: (jqxhr, status, error) => {
            console.log(error)
        }
    })
}

function signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      localStorage.removeItem("token")
      $allPage.hide()
      $login.show()
      console.log('User signed out.');
    });
}