// login jquery

let $todoContainer = $("#todos-container")
let $todoTbody = $("#todos-tbody")
let $loginForm = $('#form-login')
let $signupForm = $('#form-signup')
let $btnSignout = $('#button-signout')
let $addTodoForm = $('#form-addTodo')

if (localStorage.getItem("token") !== null) {
    $(document).ready(() => {
        $loginForm.hide()
        $signupForm.hide()
        $btnSignout.show()
        showTodo()
    })
} else {
    $(document).ready(() => {
        $signupForm.hide()
        $btnSignout.hide()
        $todoContainer.hide()
        $addTodoForm.hide()
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
            $loginForm.hide()
            $btnSignout.show()
            $addTodoForm.show()
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
            $('#form-login').hide()
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
        // data: {
        //     "title": todo.title,
        //     "description": todo.description,
        //     "due_date": todo.due_date
        // },
        success: () => {
            console.log('todo created')
            $addTodoForm[0].reset()
            showTodo()
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
            console.log('CIEEEE SIGN IN')
            localStorage.setItem("token", token)
            $loginForm.hide()
            $todoContainer.show()
            $btnSignout.show()
            $addTodoForm.show()
            showTodo()
        }
    })
}

function signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      localStorage.removeItem("token")
      $signupForm.hide()
      $todoContainer.hide()
      $loginForm.show()
      $btnSignout.hide()
      $addTodoForm.hide()
      console.log('User signed out.');
    });
}



$loginForm.on('submit', (e) => {
    e.preventDefault()
    let $email = $('#email-login').val()
    let $password = $('#password-login').val()
    login($email, $password)
})

$addTodoForm.on('submit', (e) => {
    e.preventDefault()
    let $todoTitle = $('#todo-title').val()
    let $todoDueDate = $('#todo-duedate').val()
    let $todoDescription = $('#todo-description').val()
    let newTodo = {
        "title": $todoTitle,
        "description": $todoDescription,
        "due_date": $todoDueDate
    }
    addTodo(newTodo)
})













