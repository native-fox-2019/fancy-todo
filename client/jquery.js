// login jquery

let $todoContainer = $("#todos-container")
let $todoTbody = $("#todos-tbody")

let $login = $('#login')
let $loginForm = $('#form-login')
let $btnSignout = $('#signout-button')

let $signup = $('#signup')
let $signupForm = $('#form-signup')
let $signupButton = $('#button-signup')
let $loginInsteadButton = $('#button-loginInstead')

let $addTodo = $('#form-addTodo-container')
let $addTodoForm = $('#form-addTodo')

let $editTodo = $('#form-editTodo-container')
let $editTodoForm = $('#form-editTodo')

let $googleSignin = $('#google-signin')
let $addTodoButton = $('#add-todo-button')
let $allPage = $('.all')
let todoId

if (localStorage.getItem("token") !== null) {
    $(document).ready(() => {
        // $login.hide()
        // $signup.hide()
        $allPage.hide()
        $btnSignout.show()
        $todoContainer.show()
        showTodo()
    })
} else if (localStorage.getItem("signup") === 'on sign up') {
    $allPage.hide()
    $signup.show()
} else {
    $(document).ready(() => {
        $allPage.hide()
        $login.show()
    })
}

$signupButton.on('click', () => {
    localStorage.setItem("signup", "on sign up")
    $allPage.hide()
    $signup.show()
})

$loginInsteadButton.on('click', () => {
    localStorage.removeItem("signup")
    $allPage.hide()
    $login.show()
})

$signupForm.on('submit', (e) => {
    e.preventDefault()
    let $firstName = $('#firstname-signup').val()
    let $lastName = $('#lastname-signup').val()
    let $email = $('#email-signup').val()
    let $password = $('#password-signup').val()
    register($firstName, $lastName, $email, $password)
    $signupForm[0].reset()
})

$loginForm.on('submit', (e) => {
    e.preventDefault()
    let $email = $('#email-login').val()
    let $password = $('#password-login').val()
    login($email, $password)
    $loginForm[0].reset()
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
    $allPage.hide()
    $todoContainer.show()
    $btnSignout.show()
})

$editTodoForm.on('submit', (e) => {
    e.preventDefault()
    let title = $('#todo-current-title').val()
    let description = $('#todo-current-description').val()
    let dueDate = $('#todo-current-duedate').val()
    let edited = {
        "title" : title,
        "description" : description,
        "due_date" : dueDate
    }
    editTodo(todoId, edited)
    $allPage.hide()
    $todoContainer.show()
    $btnSignout.show()
})




$googleSignin.on('click', () => {
    $allPage.hide()
    $btnSignout.show()
    $todoContainer.show()
    onSignIn()
})

$addTodoButton.on('click', () => {
    $allPage.hide()
    $addTodo.show()
})



















