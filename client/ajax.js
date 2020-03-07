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
            $projectsContainer.show()
            showProject()
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
                    let $todoAction = $(`<td></td>`)
                    let $btnDelete = $(`<button class="btn btn-primary">Delete</button> `)
                    let $btnEdit = $(`<button class="btn btn-primary">Edit</button>`)
                    let $btnCheck = $(`<td><input type="checkbox" class="form-check-input ml-2" ${todo.status === 'Completed' ?  'checked' : ''}></td>`)
                    $btnDelete.on('click', () => {
                        deleteTodo(todo.id)
                    })
                    $btnCheck.on('click', (e) => {
                        checkTodo(todo, e.target.checked)
                    })
                    $btnEdit.on('click', () => {
                        todoId = todo.id
                        $('#todo-current-title').val(() => {
                            return `${todo.title}`
                        })
                        $('#todo-current-description').val(() => {
                            return `${todo.description}`
                        })
                        $('#todo-current-duedate').val(() => {
                            return `${todo.due_date}`
                        })
                        $allPage.hide()
                        $editTodo.show()
                    })
                    
                    $todoAction.append($btnDelete)
                    $todoAction.append($btnEdit)
                    $todoItem.append($todoAction)
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

const showProject = () => {
    $.ajax({
        method: 'get',
        url: 'http://localhost:3000/projects',
        headers: {
            "token" : localStorage.getItem("token")
        },
        success: projects => {
            if (projects.length) {
                $projectsTbody.empty()
                projects.forEach(project => {
                    let $projectItem = $(`<tr><td>${project.name}</td></tr>`)
                    let $projectAction = $(`<td></td>`)
                    let $projectTodoButton = $(`<button class="btn btn-primary">Todo List</button> `)
                    let $addMemberButton = $(`<button class="btn btn-primary">Invite Member</button>`)
                    $addMemberButton.on('click', () => {
                        projectId = project.id
                        $allPage.hide()
                        $addMember.show()
                    })
                    $projectTodoButton.on('click', () => {
                        projectId = project.id
                        $allPage.hide()
                        $btnSignout.show()
                        showProjectTodos(project.id)
                        $projectTodoContainer.show()
                    })
                    $projectAction.append($projectTodoButton)
                    $projectAction.append($addMemberButton)
                    $projectItem.append($projectAction)
                    $projectsTbody.append($projectItem)
                })
            } else {
                $projectsTbody.empty()
            }
        },
        error: (jqxhr, status, error) => {
            console.log(error)
        } 
    })
}

const showProjectTodos = id => {
    $.ajax({
        method: 'get',
        url: `http://localhost:3000/projects/${id}/todos`,
        headers: {
            "token": localStorage.getItem("token")
        },
        success: todos => {
            if (todos.length) {
                $projectTodoTbody.empty()
                todos.forEach(todo => {
                    let $todoItem =  $(`<tr><td>${todo.title}</td><td>${todo.description}</td><td>${todo.due_date}</td></tr>`)
                    let $todoAction = $(`<td></td>`)
                    let $btnDelete = $(`<button class="btn btn-primary">Delete</button> `)
                    let $btnCheck = $(`<td><input type="checkbox" class="form-check-input ml-2" ${todo.status === 'Completed' ?  'checked' : ''}></td>`)
                    $btnDelete.on('click', () => {
                        deleteProjectTodo(id, todo.id)
                    })
                    $btnCheck.on('click', (e) => {
                        checkProjectTodo(id, todo.id, todo, e.target.checked)
                    })
                    
                    $todoAction.append($btnDelete)
                    $todoItem.append($todoAction)
                    $todoItem.prepend($btnCheck)
                    $projectTodoTbody.append($todoItem)
                })
            } else {
                $projectTodoTbody.empty()
            }
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
            $allPage.hide()
            $btnSignout.show()
            showProjectTodos(project.id)
            $projectTodoContainer.show()
        },
        error: (jqxhr, status, error) => {
            console.log(error)
        }
    })
}

const addProjectMember = (projectId, email) => {
    $.ajax({
        method: 'post',
        url: `http://localhost:3000/projects/${projectId}/members`,
        headers: {
            "token": localStorage.getItem("token")
        },
        data: {
            "email" : email
        },
        success: () => {
            console.log('user invited')
            $addMemberForm[0].reset()
            showProject()
            showTodo()
        }
    })
}

const addProjectTodo = (id, todo) => {
    $.ajax({
        method: 'post',
        url: `http://localhost:3000/projects/${id}/todos`,
        headers: {
            "token": localStorage.getItem("token")
        },
        data: todo,
        success: () => {
            console.log('todo created')
            $addProjectTodoForm[0].reset()
            $allPage.hide()
            $btnSignout.show()
            showProjectTodos(id)
            $projectTodoContainer.show()
        }
    })
}

const addProject = project => {
    $.ajax({
        method: 'post',
        url: `http://localhost:3000/projects`,
        headers: {
            "token" : localStorage.getItem("token")
        },
        data: project,
        success: () => {
            console.log('project created')
            $addProjectForm[0].reset()
            showProject()
            showTodo()
        }
    })
}


const editTodo = (id, todo) => {
    $.ajax({
        method: 'put',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            "token": localStorage.getItem("token")
        },
        data: todo,
        success: () => {
            console.log('todo edited')
            $editTodoForm[0].reset()
            showProject()
            showTodo()
        }
    })
}

const checkProjectTodo = (projectId, todoId, todo, status) => {
    console.log(todo)
    $.ajax({
        method: 'put',
        url: `http://localhost:3000/projects/${projectId}/todos/${todoId}`,
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
            console.log('todo edited')
            $allPage.hide()
            $btnSignout.show()
            showProjectTodos(projectId)
            $projectTodoContainer.show()
        }
    })
}

const deleteProjectTodo = (projectId, todoId) => {
    $.ajax({
        method: 'delete',
        url: `http://localhost:3000/projects/${projectId}/todos/${todoId}`,
        headers: {
            "token": localStorage.getItem("token")
        },
        success: () => {
            $allPage.hide()
            $btnSignout.show()
            showProjectTodos(projectId)
            $projectTodoContainer.show()
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
            showProject()
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
            showProject()
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